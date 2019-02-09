# Javascript Library and Project Boilerplate

This is a project boilerplate that uses Gulp 4 and Browserify.
It is suitable for javascript libraries and projects.

You can refer to `gulpfile.babel.js` file for any details.

Gulp 4 has been chosen over Webpack, in order to have more control over SASS files.

## Usage

Run `npm install` in to install the dependencies.

Run `npm run start` or `gulp` to compile and watch for changes. See other tasks below or in the `gulpfile.babel.js`
 
Run `npm run test` to run tests.

## Scripts

Boilerplate uses Browserify and Babelify. So it is possible to write ES6 code,
and use import/export. It uglifies the code as well. 

`src` folder includes `index.js` file that "requires" the default export from
the `main.js` (which is the file that shall be you the entry point for your js code).
This is a compromise for having both an exported module and global variable assigned to
the module (which is convenient for creating libraries). 

If you want to create a global variable
uncomment the `standalone` option of browserify in `gulpfile.babel.js`.

## Styles

This boilerplate uses SASS, can take multiple SASS files and produce separate css files,
which is suitable for having a file containing the main styles, and separate css files for themes.

It uses autoprefixer, generates minified CSS files as well.

## Linting

For javascript it uses ES Lint, with a slightly modified version of the "Airbnb config"
and SassLint for Sass.

## Testing

Using Mocha and Chai. Babel compiler is used so you can use imports for testing your modules.
Run `npm run test` to run it with the babel compiler.

## Serving

Using BrowserSync, automatically watching for changes. Run `gulp` or `npm run start` to run the default task.
That will lint the scripts and watch for changes and compile them.

## Tasks

* `compile` - compiles styles and scripts
* `lint` - lints styles and scripts
* `serve` - compiles and starts the server
* `watch` - lints, compiles and watches for changes

Default task servers and watches.

#### Here's a markdown cheatsheet:

## Headers

# This is an h1 tag
## This is an h2 tag
###### This is an h6 tag

## Emphasis
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

## Lists

#### Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b
  
#### Ordered

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
   
## Images

![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)

## Links

http://github.com - automatic!
[GitHub](http://github.com)

## Blockquotes

> Lorem ipsum
> dolor sit amet

## Inline code 

I think you should use an
`<addr>` element here instead.

## Syntax highlighting

```javascript
function helloWorld(message) {
    console.log(message);
}
```

## Task Lists

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

## Tables

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
