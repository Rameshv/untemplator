var fs = require('fs'),  
    _  = require('underscore'),
  api = {};

api.handleError = function(err) {
  console.log(err);
};

api.process = function process(data, output_dir, callback) {
  /*console.log('data');
  console.log(data);*/
  var nm = output_dir + '/templates.js',
    fileData = ['(function(){ var JST = { templates: {} }; ', data, 'window.JST = JST; })();'];

  fs.writeFile(nm, fileData.join(''), 'utf8', function(err) {
    if (err) api.handleError(err);
    console.log(nm + ' written.');
    if (typeof callback == "function") callback();
  });
};

api.build = function build(target_dir, callback) {
  var templates = fs.readdirSync(target_dir),
    len = templates.length,
    output = [],
    readFiles;

  // Reads a file and appends it's template function to @output
  build.readFile = function(index) {
    var tmpl = templates[index],
      nm = tmpl.split('.')[0],
      path = target_dir + '/' + tmpl;

    if (/\.jst/.test(tmpl) === false && /\.html/.test(tmpl) === false) return;

    fs.readFile(path, 'utf8', function(err, file_contents) {
      if (err) return api.handleError();

      output[index] = build.templateString(nm, file_contents);
      /*console.log('index : ' + index);
      console.log('length : ' + templates.length);      
      console.log('callback type : ' + typeof callback);*/
      if (index === 0 && typeof callback == "function") {
        //console.log('output length : ' + output.length);
        //console.log(output.join('\n\n'));
        return callback.call(api, output.join('\n\n'));
      }
      return;
    });
  };

  // Returns a string of js with the compiled template
  build.templateString = function(nm, file_contents) {
    var func;

    try {
      // delete any cached versions of the template

      console.log('Building ' + nm);
      //console.log('file_contents ' +  _.template(file_contents).source);
      func = ['JST.templates.' + nm + ' = ', _.template(file_contents).source,
      //_.template( nm, file_contents ),
      '; JST.' + nm + ' = function ' + nm + '(d,settings){ return  JST.templates.' + nm + '(d); }; '];
    } catch (e) {
      console.log('Error processing' + nm, e);
      return false;
    }
    return func.join('');
  };

  
  // Process each file in the target_directory
  while (len--) {
    build.readFile(len);
  }
};

module.exports = api;