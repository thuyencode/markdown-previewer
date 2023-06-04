// Declare a bunch of Markdown library things
const md = require('markdown-it')()
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-emoji'))

export { md }
