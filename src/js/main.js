import { editor, preview, uploadButton, saveButton, fileSelector, togglePreview } from './selectors'
import { md } from './md-renderer'
import { CHEVRON_DOUBLE_LEFT, CHEVRON_DOUBLE_RIGHT } from './icons'

// Limit up to 30.000 characters
const LIMIT = 30000

let timeOut

// The #preview is hidden by default on mobile
// Only sync scrolling on Laptop/PC
if (window.getComputedStyle(preview).display !== 'none') {
  document.querySelector('#editor').addEventListener('scroll', function callback (event) {
    event.stopPropagation()

    clearTimeout(timeOut)

    // If source is editor than the target needs to get synced is preview and vice versa
    const source = event.target
    const target = source === editor ? preview : editor

    target.removeEventListener('scroll', callback)

    // Sync scrolling by percent position
    const percentage = (source.scrollTop / (source.scrollHeight - source.clientHeight)) * 100
    target.scrollTop = (percentage / 100) * (target.scrollHeight - target.clientHeight)

    // Wait for 1s to prevent lagging
    timeOut = setTimeout(() => {
      target.addEventListener('scroll', callback)
    }, 1000)
  })
}

const streamToText = async (blob) => {
  // Get readable stream of the blob data
  const readableStream = await blob.getReader()

  let content = ''
  let len = 0

  while (true) {
    // Read stream in chunks
    const { done, value } = await readableStream.read()

    // Break the loop when there're no more chunks
    if (done) {
      break
    }

    // Convert chunks to text string
    content += new TextDecoder('utf-8').decode(value)
    len += value.length

    // If the length of content bypass 30.000 characters then break the loop
    if (len >= LIMIT) {
      break
    }
  }

  return content.substring(0, LIMIT)
}

const readFile = async (file) => {
  // Wait to get readable stream of the file content
  const fileContentStream = await file.stream()
  // Wait to get text string
  const fileContent = await streamToText(fileContentStream)

  return fileContent
}

uploadButton.addEventListener('click', (event) => {
  event.stopPropagation()
  event.preventDefault()
  // Click the hidden input element
  fileSelector.click()
})

fileSelector.addEventListener('change', (event) => {
  event.stopPropagation()

  // Get the selected file (only one)
  const mdFile = event.target.files[0]

  if (!mdFile) {
    console.error('No file provided!')
  } else {
    console.log(mdFile)

    // If not a Markdown file then exit
    if (!mdFile.name.endsWith('.md') && !mdFile.name.endsWith('.markdown')) {
      console.error('Not Markdown!')
      return
    }

    // Excute the async function to set text inside #editor
    // And render to Markdown
    (async () => {
      editor.value = await readFile(mdFile)
      preview.innerHTML = md.render(editor.value)
    })()
  }
})

// When there's a change in #editor, update the rendered result
editor.addEventListener('input', (event) => {
  event.stopPropagation()
  console.log('input')
  preview.innerHTML = md.render(editor.value)
})

// Display #preview button on small screen or tablet screen
togglePreview.addEventListener('click', (event) => {
  event.preventDefault()
  event.stopPropagation()

  const icon = togglePreview.childNodes[0]
  const span = togglePreview.childNodes[1]

  preview.classList.toggle('hidden')

  icon.innerHTML = icon.innerHTML === CHEVRON_DOUBLE_LEFT ? CHEVRON_DOUBLE_RIGHT : CHEVRON_DOUBLE_LEFT
  span.textContent = span.textContent === 'Preview' ? 'Editor' : 'Preview'
})

saveButton.addEventListener('click', (event) => {
  event.preventDefault()
  event.stopPropagation()

  // If #editor is empty then exit
  if (editor.value === '') {
    return
  }

  const time = new Date()
  // File name contains date and time
  const fileName = `my-markdown-${time.getDate()}_${time.getMonth() + 1}_${time.getFullYear()}-${time.getHours()}_${time.getMinutes()}_${time.getSeconds()}.md`
  const file = new File([editor.value], { type: 'text/markdown' })
  // Create the URL for file
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')

  link.style.display = 'none'
  link.setAttribute('download', fileName)
  link.setAttribute('href', url)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
})

fetch('docs/markdown-cheat-sheet.md')
  .then((response) => {
    return streamToText(response.body)
  })
  .then((content) => {
    editor.value = content
    preview.innerHTML = md.render(editor.value)
  })
