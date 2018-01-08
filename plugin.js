/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);
  // Plugin configs
  plugin.setConfigs({
    permissions: {
      'access_slides_unpublished': {
        'title': 'Access unpublished slides'
      }
    }
  });

  plugin.setResource({ name: 'slide' });
  plugin.setResource({ name: 'slideshow' });

  return plugin;
};