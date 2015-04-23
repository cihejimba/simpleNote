#Work Flow of Development

This is a log for developing **simpleNote** app.

##Setting up the developing wnvironment

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

Run a local development server with built in filesystem watching support integrated with LiveReload so you can develop your Ionic app in a browser. 

####grunt test

Watch for changes and run your tests, using ```karma```, ```mocha```, ```chai```.

###Cleaning up the project

