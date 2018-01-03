/**
 * Widget slideshow main file
 *
 * See https://github.com/wejs/we-core/blob/master/lib/class/Widget.js for all Widget prototype functions
 */

module.exports = function (projectPath, Widget) {
  const widget = new Widget('slideshow', __dirname);

  widget.beforeSave = function widgetBeforeSave(req, res, next) {
    if (
      !req.body.slideshowId ||
      !Number(req.body.slideshowId)
    ) {
      return next('slideshowId.required');
    }

    req.body.configuration = {
      slideshowId: Number(req.body.slideshowId)
    };

    next();
    return null;
  };

  // form middleware, use for get data for widget form
  widget.formMiddleware = function formMiddleware(req, res, next) {
    req.we.db.models.slideshow
    .findAll({
      order: [['createdAt', 'DESC']]
    })
    .then( (slideshows)=> {
      res.locals.wSlideshows = slideshows;
      next();
      return null;
    })
    .catch(next);
    return null;
  }

  // Widget view middleware, use for get data after render the widget html
  widget.viewMiddleware = function viewMiddleware(w, req, res, next) {
    const models = req.we.db.models;
    const configuration = w.configuration;

    if (!configuration) return next();

    models.slideshow
    .findOne({
      where: { id: configuration.slideshowId }
    })
    .then( (r)=> {
      return models.slide
      .findAll({
        where: { slideshowId: configuration.slideshowId },
        order: [
          ['highlighted', 'DESC'],
          ['publishedAt', 'DESC'],
          ['createdAt', 'DESC']
        ]
      })
      .then( (s)=> {
        s.forEach((slide)=>{
          slide.imageOBJ = slide.image[0];
        });

        r.slides = s;
        return r;
      });
    })
    .then( (r)=> {
      w.slideshow = r;
      next();
      return null;
    })
    .catch(next);
    return null;
  }

  return widget;
};