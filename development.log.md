#Work Flow of Developing simpleNote App

In this log I'd like to document the work flow of developing the simpleNote app.

##Project management method

In this project we will use [Trello](https://trello.com/about). It is free, flexible and really useful tool for managing your projects.

We create 5 tables in [the simpleNote board](https://trello.com/b/zlgPDTj4/simplenote):

- **Backlog**: these cards contains features in user stories and acceptance criteria form
- **Sprint backlog**: backlog cards being in the given sprint
- **Todo**: the tasks that we can hammer out the features with
- **In progress**: tasks in progress
- **Done**: done tasks

For now we created the following cards in Backlog:

- **Setting up developing environment**
- **Create a list of notes (show title)**
- **Show details of notes (title, text, tags)**
- **Add note**
- **Remove note**
- **Edit note**
- **Filter note by search term**
- **Synchronize note data with database**

In the following we'll walk through the cards above and realize them.

##1. Setting up the developing environment

###1.1. Using Ionic Framework

We develop this app in [Ionic](http://ionicframework.com/) framework. I wrote a [blogpost](http://js-workout.tompascall.com/lets-create-hybrid-mobile-apps-with-ionic-framework/) on setting up your environment for an ionic project.

###1.2. Using Yeoman

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

###1.3 Project Structure

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

Source: https://github.com/diegonetto/generator-ionic
```
###1.4. Workflow commands

For all commands check out the [Ionic Generator](https://github.com/diegonetto/generator-ionic) page (but first your Gruntfile.js)

####grunt serve

Run a local development server with built in file system watching support integrated with LiveReload so you can develop your Ionic app in a browser. It also does linting your code.

####grunt test

Watch for changes and run your tests, using ```karma```, ```mocha```, ```chai```.

###1.5. Cleaning up the template

- ```app/scripts/app.js```: changing the main module name (simpleNote), removing unwanted comments and adding ```'use strict'```
- ```app/index.html```: adding title (simpleNote), updating the module name and the header title

###1.6. Editorconfig

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

###1.7. Setting up test environment

Running ```grunt test``` launches [Karma](http://karma-runner.github.io/0.12/index.html) testing tool. This grunt task watches *.js file changing in the following libraries (and their sub-libraries)

- app/scripts
- test/mock
- test/spec

The latter two libraries doesn't exist, so we have to create them. After creating the folders you need rerun ```grunt test``` for correct watching.

####1.7.1. Create a sample test

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

**Add preprocessor** to karma task's options:

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

####1.7.2. Extending test framework with karma-jquery and chai-jquery

If you want to write tests for Angular directives, you need tools for testing DOM elements. This is where [karma-jquery](https://github.com/scf2k/karma-jquery) and [karma-chai-jquery](https://www.npmjs.com/package/karma-chai-jquery) come into play. Let's install them:

```bash
$ npm install karma-jquery karma-chai-jquery --save-dev
```

We need to update the karma task in ```Gruntfile.js```:

```js
options: {
  frameworks: ['chai-jquery', 'chai', 'jquery-1.8.3', 'mocha'],
  (...)
}
```

Check out the order of frameworks. As of this writing you need to keep this order (from the most specified to the less specified), otherwise you'll get an error.

Let's write a test that uses these frameworks. We'd like to develop a button element with a *sample-class* css class, and an inner ```<h1>``` element:

```js
describe('Directive: sample-directive', function () {
  var $compile;
  var scope;
  var element;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<sample-directive></sample-directive>')(scope);
    scope.$digest();
  }));

  it('gets the appropriate content', function () {
    expect(element.html()).to.contain('<h1>Sample</h1>');
  });

  it('should get button element and check its css class', function () {
    var buttons = element.find('button');
    expect(buttons.eq(0)).to.have.class('sample-class');
  });
});
  
```

##2. Create a list of notes (show title)

###2.1. USER STORY

>AS I customer I WANT to see a list of my notes SO THAT I can read their title

###2.2. ACCEPTANCE CRITERIA

GIVEN I am a user
WHEN I open the app
THEN I can see a list of my notes (its title)

###2.3. Todos

- Create mock data of notes
- Create directive for note list
- Deploy and test app on multiple devices

###2.4. Create mock data of notes

The data of notes will be stored as Angular value (noteData), in the following format:

```js
[
  {
    title: noteTitle1
  },
  {
    title: noteTitle2
  }
]
```

####2.4.1. Unit test for noteData service

```js
// mock-data.spec.js

'use strict';

describe('Service: noteData', function () {

  beforeEach(module('simpleNote'));
    var noteData;

  beforeEach(inject(function ($injector) {
    noteData = $injector.get('noteData');
  }));

  it('should get noteData service', function () {
    expect(noteData).to.not.equal(undefined);
    expect(noteData.notes).to.be.an('array');
    expect(noteData.notes[0].title).to.be.a('string');
  });
});
```

####2.4.2. Create noteData service

```js
// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory() {
  return {
    notes: [
      {
        title: 'noteTitle1'
      }
    ]
  };
});
```

**note:** I  tried to save my service to ```app/scripts/01_list-of-notes directory, but Karma or Angular didn't like its name, I had to remove the number tag.

###2.5. Create directive for note list

Show the list of notes using Angular directive. Populate data form the noteData service.

####2.5.1. Test for noteList directive

```js
// noteList.drv.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<note-list></note-list>')(scope);
    scope.$digest();
  }));

  it('contains the appropriate content', function () {
    expect(element.html()).to.contain('ng-repeat="note in notes"');
  });
});
```

####2.5.2. Create noteList directive


```js
// noteList.drv.js

'use strict';

angular.module('simpleNote').directive('noteList', noteList);

function noteList () {
  return {
    restrict: 'E',
    templateUrl: 'list-of-notes/note-list.drv.html',
  };
}
```

####2.5.3. Create the template for noteList directive

We give a temporary ```notes``` array for ng-repeat. Without this we would get an assertion error message as running test.

```html
<ul ng-init="notes = [1,2,3]">
  <li ng-repeat="note in notes"></li>
</ul>
```



