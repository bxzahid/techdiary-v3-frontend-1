const prismjs = require('markdown-it-prism')
const md = require('markdown-it')
// md.use(prismjs)

export default function markdown(markdownText) {
  return md.render(markdownText)
}
