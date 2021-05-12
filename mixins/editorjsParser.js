import md from '~/mixins/MarkdownParser'
// import ImageWidget from '~/components/ImageWidget.vue'
// import Vue from 'vue'

class ArticleImage {
  constructor(imageUrl) {
    this.imageUrl = imageUrl
  }

  checkHost() {
    const url = new URL(this.imageUrl)
    return url.host
  }
  isCloudinary() {
    return this.checkHost() === 'res.cloudinary.com'
  }
  cloudinaryPublicId() {
    if (!this.isCloudinary)
      throw new Error('This is not a cloudinary image url')
    return this.imageUrl.split('/').slice(-2).join('/')
  }

  getImageUrl() {
    return this.isCloudinary() ? $cloudinary.url(this.cloudinaryPublicId()) : ''
  }
}

export default {
  methods: {
    editorJsParser(blocks) {
      var html = ''
      blocks.forEach(function(block) {
        if (block.type === 'header') {
          /**
           * --------------------------------------------------
           *  Block: header
           * --------------------------------------------------
           */
          html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`
        } else if (block.type === 'paragraph') {
          /**
           * --------------------------------------------------
           *  Block: paragraph
           * --------------------------------------------------
           */
          html += `<p>${block.data.text}</p>`
        } else if (block.type === 'delimiter') {
          /**
           * --------------------------------------------------
           *  Block: delimiter
           * --------------------------------------------------
           */
          html += '<hr />'
        } else if (block.type === 'image') {
          /**
           * --------------------------------------------------
           *  Block: Image
           * --------------------------------------------------
           */
          let publicId = block.data.file.url.split('/').slice(-2).join('/')
          const imageUrl = `https://res.cloudinary.com/techdiary-dev/image/upload/c_scale,f_auto,q_auto/v1/${publicId}`
          const title = block.data.caption ? block.data.caption : 'article-image'
          html += `
        <figure class='${
            block.data.stretched ? 'image--stretched' : 'image--normal'
          }'>
          <img src='${
            imageUrl
          }' title='Techdiary: ${title}' alt='Techdiary: ${title}' loading='lazy' />
        ${
            block.data.caption
              ? `<figcaption>${block.data.caption}</figcaption>`
              : ''
          }
          </figure/>
        `
        } else if (block.type === 'embed') {
          /**
           * --------------------------------------------------
           *  Block: embed
           * --------------------------------------------------
           */
          html += `
        <div class='techdiary-embed'>
            <iframe src='${block.data.embed}' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
        </div>
        `
        } else if (block.type === 'code') {
          /**
           * --------------------------------------------------
           *  Block: code
           * --------------------------------------------------
           */
          const code =
            '```' + block.data.languageCode + '\n' + block.data.code + '\n' + '```'
          const parsedHtmlCode = md(code)

          html += parsedHtmlCode
        } else if (block.type === 'warning') {
          /**
           * --------------------------------------------------
           *  Block: warning
           * --------------------------------------------------
           */
          html += `<blockquote class='warning'>
        <div class=' flex space-x-2 items-center'>
          <svg class='w-8 h-8 text-yellow-500' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
            <path fill-rule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clip-rule='evenodd' />
          </svg>
          <span class='p-0 m-0 font-bold uppercase text-yellow-600'>${block.data.title}</span>
        </div>
        <div class='mt-2'>
          ${block.data.message}
        </div>
      </blockquote>`
        } else if (block.type === 'quote') {
          /**
           * --------------------------------------------------
           *  Block: quote
           * --------------------------------------------------
           */
          html += `<blockquote>
        <p class='quotation'>
          ${block.data.text}
        </p>

        ${
            block.data.caption !== null
              ? `<p class='author'>- ${block.data.caption}</p>`
              : ''
          }
      </blockquote>`
        } else if (block.type === 'linkTool') {
          /**
           * --------------------------------------------------
           *  Block: linkTool
           * --------------------------------------------------
           */
          html += `
          <a class='techdiary-embeded-link flex hover:no-underline border border-gray-50 shadow p-3' href='${block.data.link}' target='_blank'>
            <div>
                <p class=' text-gray-500'>${block.data.meta.title}</p>
                <p>${block.data.meta.description}</p>
            </div>
            <div class='   w-96 h-96 overflow-hidden'>
              <img src='${block.data.meta.image.url}'/>
            </div>
          </a>
        `
        } else if (block.type === 'table') {
          /**
           * --------------------------------------------------
           *  Block: Table
           * --------------------------------------------------
           */

          const rows = block.data.content.map((row) => {
            return `<tr>${row.reduce(
              (acc, cell) =>
                acc + `<td class=' p-2 border border-gray-200'>${cell}</td>`,
              ''
            )}</tr>`
          })

          html += `<table class=' w-full my-8'>${rows.join('')}</table>`
        } else if (block.type === 'checklist') {
          /**
           * --------------------------------------------------
           *  Block: checklist
           * --------------------------------------------------
           */
          html += `<ul class='todo'>`
          block.data.items.forEach(function(li) {
            html += `<li class='todo__item'><div class='todo__state todo__state--${
              li.checked ? 'checked' : 'unchecked'
            }'></div>
        <div class='todo__text'>
          ${li.text}
        </div>
        </li>`
          })
          html += `</ul>`
        } else if (block.type === 'list') {
          html += `<${block.data.style === 'ordered' ? 'o' : 'u'}l>`
          block.data.items.forEach(function(li) {
            html += `<li>${li}</li>`
          })
          html += `</${block.data.style === 'ordered' ? 'o' : 'u'}l>`
        }
      })

      return html
    }
  }
}
