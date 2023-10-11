import { useDebounce } from '@uidotdev/usehooks'
import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react'

type ContextType = {
  isPreviewerOpen: boolean
  setPreviewerOpen: Dispatch<SetStateAction<boolean>>
  isPreviewerLoading: boolean
  setPreviewerLoading: Dispatch<SetStateAction<boolean>>
  markdown: string
  setMarkdown: Dispatch<SetStateAction<string>>
  textEditorRef: MutableRefObject<HTMLTextAreaElement | null>
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
}

export const Context = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: ReactNode }) {
  const textEditorRef = useRef<HTMLTextAreaElement | null>(null)
  const [isPreviewerOpen, setPreviewerOpen] = useState(false)
  const [isPreviewerLoading, setPreviewerLoading] = useState(true)
  const [markdown, setMarkdown] = useState('')
  const debouncedMarkdown = useDebounce(markdown, 300)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (textEditorRef.current == null) {
      throw new Error('<Textarea></Textarea> not found!')
    }

    const textEditor = textEditorRef.current
    const file = e.target.files ? e.target.files[0] : null

    if (file == null) {
      throw new Error('No file provided!')
    }

    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
      throw new Error(`${file.name} is not a Markdown file`)
    }

    const reader = new FileReader()

    function readFile(e: ProgressEvent<FileReader>) {
      const result = e.target?.result?.toString() || ''

      textEditor.value = result
      setMarkdown(result)
    }

    reader.addEventListener('load', readFile)
    reader.readAsText(file, 'UTF-8')
  }

  function handleSave() {
    if (textEditorRef.current == null) {
      throw new Error('<Textarea></Textarea> not found!')
    }

    const textEditor = textEditorRef.current
    const time = new Date()

    const fileName = `my-markdown-${time.getDate()}_${
      time.getMonth() + 1
    }_${time.getFullYear()}-${time.getHours()}_${time.getMinutes()}_${time.getSeconds()}.md`

    const file = new File([textEditor.value], fileName, {
      type: 'text/x-markdown',
    })

    const url = URL.createObjectURL(file)
    const link = document.createElement('a')

    link.style.display = 'none'
    link.setAttribute('download', fileName)
    link.setAttribute('href', url)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Context.Provider
      value={{
        markdown: debouncedMarkdown,
        setMarkdown,
        textEditorRef,
        isPreviewerOpen,
        setPreviewerOpen,
        isPreviewerLoading,
        setPreviewerLoading,
        handleFileChange,
        handleSave,
      }}
    >
      {children}
    </Context.Provider>
  )
}
