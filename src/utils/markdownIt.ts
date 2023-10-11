/* eslint-disable @typescript-eslint/no-var-requires */
// Import a bunch of Markdown-it plugins
import { align } from '@mdit/plugin-align'
import { attrs } from '@mdit/plugin-attrs'
import { figure } from '@mdit/plugin-figure'
import { footnote } from '@mdit/plugin-footnote'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import { imgSize } from '@mdit/plugin-img-size'
import { mark } from '@mdit/plugin-mark'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import { tasklist } from '@mdit/plugin-tasklist'
import MarkdownIt from 'markdown-it'

const md = MarkdownIt({
  typographer: true,
  html: true,
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
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-emoji'))

export { md }
