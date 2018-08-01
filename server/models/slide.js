/**
 * Slide model
 */

module.exports = function slideModel(we) {
  const model = {
    definition: {
      title: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: we.db.Sequelize.TEXT,
        allowNull: true,
        formFieldType: 'textarea',
      },
      link: {
        type: we.db.Sequelize.STRING,
        allowNull: true
      },
      linkText: {
        type: we.db.Sequelize.STRING,
        allowNull: true
      },
      published: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: false,
        formFieldType: null
      },
      publishedAt: {
        type: we.db.Sequelize.DATE,
        allowNull: true
      },
      highlighted: {
        type: we.db.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        formFieldType: null
      }
    },
    associations: {
      creator: {
        type: 'belongsTo',
        model: 'user'
      },
      slideshow: {
        type: 'belongsTo',
        model: 'slideshow',
        inverse: 'slides'
      }
    },
    options: {
      titleField: 'title',
      enableAlias: false,
      imageFields: {
        image: { formFieldMultiple: false }
      },
      classMethods: {},
      hooks: {
        beforeValidate(r) {
          // force default 0 value:
          if (!r.highlighted) r.highlighted = 0;
        },
        beforeCreate(r) {
          // create an published content and set its publishedDate:
          if (r.published) {
            r.publishedAt = Date.now();
          }
        },
        beforeUpdate(r) {
          if (r.published && !r.publishedAt) {
            // set publishedAt on publish:
            r.publishedAt = Date.now();
          } else if (!r.published && r.publishedAt) {
            // reset publishedAt on unpublish
            r.publishedAt = null;
          }
        }
      }
    }
  };

  return model;
};
