# ACA Composer Starter Kit

A quick start scaffold for building interactive, web based user interfaces for
ACA Engine.

## Getting Started:

1. Install Git
   * http://git-scm.com/downloads
1. Install NodeJS
   * http://nodejs.org/
2. Install Ruby (Windows only)
   * http://rubyinstaller.org/downloads/ (1.9.3 32bit + DevKit TDM)
   * Install ruby and add to path
   * extract devkit to the ruby folder (i.e. c:\ruby193)
   * open CMD to the ruby folder and type:
   * `ruby dk.rb init`
   * `ruby dk.rb install`
3. Final Steps
   * Open a terminal to your projects folder
   * Run `git clone https://github.com/advancedcontrol/composer-starter-kit.git`
   * Then `cd composer-starter-kit` into the project and run the following in order
   * `gem install compass` this compiles CSS
   * `npm install -g bower` this manages javascript dependencies
   * `npm install -g gulp` this manages live reloading of the browser
   * `npm install` this command grabs all our development dependencies
   * `bower install` this grabs javascript libraries (If bower asks questions AngularJS 1.3 is preferable)
4. Open your browser to: http://localhost:9000/#/

Now if you edit the SCSS or HTML files, in the app directory, you'll see the changes take effect in your browser immediately.

