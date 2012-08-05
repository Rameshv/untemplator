# JST for Javascript Templates

This is heavily based on <a href="https://github.com/wookiehangover/jquery-tmpl-jst">jquery-tmpl-jst</a>

untemplator: Node.js module to pre-compile Javascript Templates using underscore.js

## Install with NPM
The best / easiest way to start using untemplator is to install it
with npm, which looks something like this: `npm install https://github.com/Rameshv/untemplator/tarball/master`

Be sure to use the `--global` option if you'd like to use the command
line tool.

## Basic usage

Untemplaor will expose 2 functions: `build` and `process`

    var tmpl = require('untemplator');

    // Builds a template string
    tmpl.build( 'path/to/my/templates', function( output ){

      // Creates a file called templates.js
      tmpl.process( output, 'path/to/output/dir' );
    });

Build creates a string of executable javascript from a directory of
templates. It accepts the location of your templates and a callback
function.

Process creates a file called `templates.js` in the specified target
directory. It accepts a template string and a the target location.

## CLI usage

untemplator also comes with a command line tool, which you can use
like this:

    $ untemplate path/to/templates path/to/save

This creates the file `templates.js` to the target directory. If no
arguments are passed, the current path will be used instead.



## JST Output


To start using the compiled templates, just include `templates.js`.
`templates.js` creates a global object called `window.JST`.

The `JST` object includes a `templates` object containing all of your
precompiled templates. Helper methods for easier usage are attached
directly to the `JST` object, which is structured like this:

    JST = {
      <template_name>,
      <template_name_2>,
      ...
      templates: {
        <template_name>,
        <template_name_2>,
        ...
      }
    }

The helper methods are meant to make using templates as easy as
possible, so they are functions that take JSON data to be templated as
the only argument.


And you can call the templator object just like this

      var data = { title: "foobar" },
          compiled_template = window.JST.sample_template( my_data );

      $('body').html( compiled_template );


