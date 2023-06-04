import { editor, preview, uploadButton, fileSelector } from './selectors'

const streamToText = async (blob) => {
  const readableStream = await blob.getReader()
  const chunk = await readableStream.read()

  return new TextDecoder('utf-8').decode(chunk.value)
}

const readFile = async (file) => {
  // Check if the file is a Markdown file
  if (!file || (!file.name.endsWith('.md') && !file.name.endsWith('.markdown'))) {
    console.error('File is not a markdown!')
    console.log(file)

    return
  }

  const fileContentStream = await file.stream()
  const fileContent = await streamToText(fileContentStream)

  editor.value = fileContent
}

uploadButton.addEventListener('click', (event) => {
  event.stopPropagation()
  event.preventDefault()
  fileSelector.click()
})

fileSelector.addEventListener('change', (event) => {
  event.stopPropagation()

  const mdFile = event.target.files[0]

  if (!mdFile) {
    console.error('No file provided!')
  } else {
    console.log(mdFile)

    if (!mdFile.name.endsWith('.md') && !mdFile.name.endsWith('.markdown')) {
      console.error('Not Markdown!')
      return
    }

    readFile(mdFile)
  }
})
