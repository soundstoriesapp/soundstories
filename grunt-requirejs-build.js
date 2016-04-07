module.exports = {
  appDir: 'public/app-source',
  baseUrl: '.',
  mainConfigFile: 'public/app-source/app.js',
  dir: 'public/dist',
  modules: [
    // First set up the common build layer.
    {
      // module names are relative to baseUrl
      name: 'app',
      // List common dependencies here. Only need to list
      // top level dependencies, 'include' will find
      // nested dependencies.
      include: [
       
      ],
      exclude: [
           
      ]
    }
    
    
    
  ]
};
