#Work Flow of Development

This is a log for developing **simpleNote** app.

##Setting up the developing environment

###Using Ionic Framework
We develop this app in [Ionic](http://ionicframework.com/) framework. I wrote a [blogpost](http://js-workout.tompascall.com/lets-create-hybrid-mobile-apps-with-ionic-framework/) on seting up your environment for an ionic project.

###Using Yeoman

We generate the template using [Yeoman](http://yeoman.io/), especially the Yeoman [Ionic Generator](https://github.com/diegonetto/generator-ionic):

```bash
$ npm install -g generator-ionic
```

Then scaffold the project:

```bash
$ yo ionic simpleNote
```

- didn't use Sass with Compass now
- no additional Cordova plugins than defaults
- *Blank* starter template

In Windows you need to install Python 2.7.~, and Visual Studio Express to get the build.

###Project Structure

```
├── Gruntfile.js            - Configuration of all Grunt tasks
├── package.json            - Dev dependencies and required Cordova plugins
├── bower.json              - Lists front-end dependencies
├── config.xml              - Global Cordova configuration
├── .gitignore              - Best practices for checking in Cordova apps
├── resources/              - Scaffolded placeholder Icons and Splashscreens
│   ├── ios/
│   ├── android/
├── app/
│   ├── index.html          - Main Ionic app entry point
│   ├── lib/                - Libraries managed by Bower
│   ├── scripts/            - Custom AngularJS Scripts
│   ├── styles/             - Stylesheets
│   ├── templates/          - HTML views
├── platforms/              - Targeted operating systems
├── plugins/                - Native plugins
├── hooks/                  - Cordova lifecycle hooks
├── merges/                 - Platform specific overrides
├── coverage/               - Istanbul reports
├── test/                   - Unit tests
│   ├── spec/
├── www/                    - Copied from app/ to be used by Cordova
```
###Workflow commands

For all commands check out the [Ionic Generator](https://github.com/diegonetto/generator-ionic) page (but first your Gruntfile.js)

####grunt serve

Run a local development server with built in file system watching support integrated with LiveReload so you can develop your Ionic app in a browser. It also does linting your code.

####grunt test

Watch for changes and run your tests, using ```karma```, ```mocha```, ```chai```.

###Cleaning up the template

- ```app/scripts/app.js```: changing the main module name (simpleNote), removing unwanted comments and adding ```'use strict'```
- ```app/index.html```: adding title (simpleNote), updating the module name and the header title

###Editorconfig

EditorConfig is used to maintain consistent coding styles. There is an `.editorconfig` file in the project root directory, that defines the main styles.

You have [EditorConfig plugins](http://editorconfig.org/) for lots of editors.

As opening a file, EditorConfig plugins look for a file named `.editorconfig` in the directory of the opened file and in every parent directory. A search for `.editorconfig` files will stop if the root filepath is reached or an `.editorconfig` file with `root=true` is found.

The content of .editorconfig file:
```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

###Setting up test environment

Running ```grunt test``` launches [Karma](http://karma-runner.github.io/0.12/index.html) testing tool. This grunt task watches *.js file changing in the following libraries (and their sub-libraries)

- app/scripts
- test/mock
- test/spec

The latter two libraries doesn't exist, so we have to create them. After creating the folders you need rerun ```grunt test``` for correct watching.

####Create a sample test

Let's create a sample test to see if our testing tool works:

```js
// test/spec/sample.spec.js

'use strict';

describe('Sample test for setting up development framework', function () {
  it('should be ok', function () {
    expect(true).to.equal(true);
  });
});
```
Let's test a sample angular directive. First install [karma-ng-html2js-preprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor). As its documentation says

>This preprocessor converts HTML files into JS strings and generates Angular modules. These modules, when loaded, puts these HTML files into the $templateCache and therefore Angular won't try to fetch them from the server.

```bash
$ npm install karma-ng-html2js-preprocessor --save-dev
```
We need update our ```Gruntfile.js```'s karma task. Add the correct path to files array:

```js
files: [
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.drv.html': ['ng-html2js']
        ],
```

Add preprocessor to karma task's options:

```js
preprocessors: {
          (...)
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.drv.html': ['ng-html2js']
        },
ngHtml2JsPreprocessor: {
  // strip this from the file path
  stripPrefix: 'app/scripts/', // to get the correct path regards building
  
  // setting this option will create only a single module that contains templates
  // from all the files, so you can load them all with module('templates')
  moduleName: 'templates'
},
```

Now we can create our second test in sample.spec.js:

```js
describe('Directive: sample-directive', function () {
  var $compile;
  var scope;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  it('should get the appropriate content', function () {
    var element = $compile('<sample-directive></sample-directive>')(scope);
    scope.$digest();
    expect(element.html()).to.contain('<h1>Sample</h1>');
  });
});

```

And write the sample directive:

- create a ```sample``` folder in ```app/scripts```
- create a file in ```app/scripts/sample/sample.drv.js```

```js
// sample.drv.js

'use strict';

angular.module('simpleNote').directive('sampleDirective', function () {
  return {
    restrict: 'E',
    templateUrl: 'sample/sample.drv.html'
  };
});

```

Finally, create the test template ```app/scripts/sample/sample.drv.html```:

```html
<h1>Sample</h1>

```

####Extending test framework with karma-jquery and chai-jquery
