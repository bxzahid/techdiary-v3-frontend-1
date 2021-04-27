import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'

const md = new MarkdownIt()

md.use(prism)

export default (markdownText) => {
  return md.render(markdownText)
}
