// Import a bunch of Markdown-it plugins
const { tasklist } = require('@mdit/plugin-tasklist')
const { sub } = require('@mdit/plugin-sub')
const { sup } = require('@mdit/plugin-sup')
const { mark } = require('@mdit/plugin-mark')
const { footnote } = require('@mdit/plugin-footnote')
const { align } = require('@mdit/plugin-align')
const { attrs } = require('@mdit/plugin-attrs')
const { figure } = require('@mdit/plugin-figure')
const { imgLazyload } = require('@mdit/plugin-img-lazyload')
const { imgSize } = require('@mdit/plugin-img-size')

const md = require('markdown-it')({
  typographer: true
})
  .use(footnote)
  .use(mark)
  .use(sub)
  .use(sup)
  .use(tasklist)
  .use(align)
  .use(attrs)
  .use(figure)
  .use(imgLazyload)
  .use(imgSize)
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-emoji'))

export { md }
