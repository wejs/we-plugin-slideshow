/**
 * Slideshow model
 */

module.exports = function slideshowModel(we) {
  const model = {
    definition: {
      name: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: we.db.Sequelize.TEXT,
        allowNull: true,
        formFieldType: 'textarea',
      }
    },
    associations: {
      creator: {
        type: 'belongsTo',
        model: 'user'
      },
      slides: {
        type: 'hasMany',
        model: 'slide',
        inverse: 'slideshow'
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
        beforeCreate(r, opts, done) {
          if (r.published) {
            r.publishedAt = Date.now();
          }

          done();
          return r;
        },

        beforeUpdate(r, opts, done) {
          if (r.published && !r.publishedAt) {
            // set publishedAt on publish:
            r.publishedAt = Date.now();
          } else if (!r.published && r.publishedAt) {
            // reset publishedAt on unpublish
            r.publishedAt = null;
          }

          done();
          return r;
        }

      }
    }
  };

  return model;
};
