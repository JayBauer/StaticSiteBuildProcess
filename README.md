# Gulp and PostCSS is preeeetty cool
Jay's in the house with the brand new jam.

## Parser
- [Pug](https://pugjs.org/): Pug templating language. Makes creating markup super spicy. Make sure to check out the documentation or you'll have no idea what's going on.

## PostCSS Plugins
### The Basics
- [Partial Import](https://github.com/jonathantneal/postcss-partial-import): Import partials, like Sass. Supports globbing, unlike Sass. Though this seems to increase compile time, not 100% sure. More testing is needed.
- [Nested](https://github.com/postcss/postcss-nested): Enables Sass-like nesting. Pretty much a necessity.
- [Advanced Variables](https://github.com/jonathantneal/postcss-advanced-variables): Lets you use Sass-like variables, but also comes with conditionals and iterators.
- [Define Function](https://www.npmjs.com/package/postcss-define-function): Enables Sass-like functions, to the best of it's ability.
- [Extend At-Rule](https://github.com/jonathantneal/postcss-extend-rule): Enables the use of the `@extend` rule to extend your classes. Recommended to use the `%` character in front of your class names to designate them as extends.
- [Math](https://github.com/shauns/postcss-math): Enables many new math functions available through the `math()` function by default.
- [Autoprefixer](https://github.com/postcss/autoprefixer): Automatically applies vendor prefixes to all properties when necessary. Also removes outdated vendor-prefixes.

### Grid
- [Lost](http://lostgrid.org/): Lost grid system. Super modular and flexible. Has the "FlexBox" version enabled by default.

### Utilities
- [Font Magician](https://github.com/jonathantneal/postcss-font-magician): Literally does everything you could ever want for @font-faces. Check the site for options, you're gonna need them customized for every project.
- [PxToRem](https://github.com/cuth/postcss-pxtorem): Converts pixel units to rem. Only on font-related sizes by default.
- [Custom Media](https://github.com/postcss/postcss-custom-media): Makes future CSS syntax for @custom-media functions available.
- [Media MinMax](https://github.com/postcss/postcss-media-minmax): Allows for operators like `>` and `<=` in media queries.
- [Assets](https://github.com/borodean/postcss-assets): Isolates stylesheets from environmental changes, gets image sizes, and suffixes URLs to prevent things from breaking. Also Cachebuster.
- [Short](https://github.com/jonathantneal/postcss-short): Opens up a bunch of shorthand utility properties.
- [Image-Set Polyfill](https://github.com/SuperOl3g/postcss-image-set-polyfill): Automatically selects images based on screen DPI.
- [FontAwesome](https://github.com/dan-gamble/postcss-font-awesome): Adds a succinct way of generating FontAwesome icons

### Compile time
- [Stylelint](https://github.com/stylelint/stylelint): Lints the stylesheet to check for errors and enforce type consistency. Using the recommended spec at the moment.
- [CSSNano](http://cssnano.co/): CSS minifier; lots of available options.

## Design Stuff
- [Vertical Rhythm](https://zellwk.com/blog/why-vertical-rhythms/): Keep a consistent line-height, use multiples of that line-height when determining spacing and margins whenever possible on the site

More to come
