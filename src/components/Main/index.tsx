/* eslint-disable react-hooks/exhaustive-deps */
import useAppContext from '@/hooks/useAppContext'
import { Suspense, lazy, useEffect, useRef } from 'react'
import Fallback from './Fallback'
import TextEditor from './TextEditor'

const MarkdownPreviewer = lazy(() => import('./MarkdownPreviewer'))

export default function Main() {
  const {
    markdown,
    setMarkdown,
    textEditorRef,
    isPreviewerOpen,
    isPreviewerLoading,
  } = useAppContext()
  const markdownPreviewerRef = useRef<HTMLDivElement | null>(null)
  const timeout = useRef(0)

  useEffect(() => {
    if (textEditorRef.current == null) return

    const textEditor = textEditorRef.current

    fetch('markdown-cheat-sheet.md')
      .then((response) => response.text())
      .then((content) => (textEditor.value = content))
  }, [])

  useEffect(() => {
    if (!isPreviewerOpen) return
    if (textEditorRef.current == null) return

    const textEditor = textEditorRef.current

    function handleInput() {
      setMarkdown(textEditor.value)
    }

    handleInput()
    textEditor.addEventListener('input', handleInput)

    return () => textEditor.removeEventListener('input', handleInput)
  }, [isPreviewerOpen, setMarkdown])

  useEffect(() => {
    if (isPreviewerLoading) return
    if (textEditorRef.current == null) return
    if (markdownPreviewerRef.current == null) return

    const textEditor = textEditorRef.current
    const markdownPreviewer = markdownPreviewerRef.current

    function handleScrolling(e: Event) {
      e.stopPropagation()
      clearTimeout(timeout.current)

      const source = e.target as HTMLElement

      if (source == null) return

      const target = source === textEditor ? markdownPreviewer : textEditor

      target.removeEventListener('scroll', handleScrolling)

      const percentage =
        (source.scrollTop / (source.scrollHeight - source.clientHeight)) * 100
      target.scrollTop =
        (percentage / 100) * (target.scrollHeight - target.clientHeight)

      timeout.current = window.setTimeout(() => {
        target.addEventListener('scroll', handleScrolling)
      }, 1000)
    }

    textEditor.addEventListener('scroll', handleScrolling)
    markdownPreviewer.addEventListener('scroll', handleScrolling)

    return () => {
      textEditor.removeEventListener('scroll', handleScrolling)
      markdownPreviewer.removeEventListener('scroll', handleScrolling)
    }
  }, [isPreviewerLoading])

  return (
    <main className='relative mt-14 flex h-[calc(100%-3.5rem)] w-screen'>
      <TextEditor
        className='h-full w-full shrink resize-none scroll-smooth rounded-none bg-slate-50 p-3 font-mono focus:shadow-inner focus:outline-none dark:bg-gray-950 dark:text-white'
        id='editor'
        name='editor'
        placeholder='Write down your Markdown...'
        maxLength={30000}
        ref={textEditorRef}
      />
      <Suspense fallback={<Fallback />}>
        {isPreviewerOpen ? (
          <MarkdownPreviewer
            className='markdown-body absolute h-full w-full shrink resize-none overflow-y-scroll scroll-smooth bg-white p-3 font-sans dark:bg-slate-950 md:static'
            id='preview'
            preview={markdown}
            ref={markdownPreviewerRef}
          />
        ) : null}
      </Suspense>
    </main>
  )
}
