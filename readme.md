# Indian Energy Data Collection Animation



## Requirements

* git - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
* gulp - https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md


## Development

Work in the ```src/``` folder. You can manually transpile your ES6 syntax back to ES5 using ```gulp babel```. The ```gulp watch``` task monitors changes in the src folder and runs the build task.


## Install

```bash
$ git clone https://github.com/NREL/ie-data-collection-animation.git
$ npm install
```

## Build
To build the distribution, run the build task.

```bash
$ gulp build
```
(You can run the ```gulp watch``` task to continually build.)

## Deploy
To deploy to http://nrel.github.io/ie-data-collection-animation/ run the deploy task

```bash
$ gulp deploy
```

### In the wild
http://energy.gov/indianenergy/maps/got-data
