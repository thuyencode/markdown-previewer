import useAppContext from '@/hooks/useAppContext'
import { useRef } from 'react'
import {
  Download,
  FileEarmark,
  Github,
  Upload,
  XLg,
} from 'react-bootstrap-icons'
import Button from './Button'

export default function Header() {
  const { handleFileChange, handleSave, isPreviewerOpen, setPreviewerOpen } =
    useAppContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <header className='fixed top-0 flex h-14 w-full items-center justify-between bg-white px-3 shadow-md dark:bg-slate-800'>
      <div className='space-x-3'>
        <Button
          variants='primary'
          type='button'
          id='upload-button'
          onClick={() => inputRef.current?.click()}
        >
          <Upload className='h-5 w-4' />
          <span className='hidden sm:inline'>Upload</span>
        </Button>
        <input
          className='hidden'
          type='file'
          id='file-selector'
          accept='.md'
          ref={inputRef}
          onChange={handleFileChange}
        />
        <Button
          variants='secondary'
          type='button'
          id='save-button'
          onClick={handleSave}
        >
          <Download className='h-5 w-4' />
          <span className='hidden sm:inline'>Save</span>
        </Button>
        <Button
          className={`${
            isPreviewerOpen &&
            'hover:bg-red-500 hover:hover:inner-border-red-500'
          }`}
          id='toggle-preview'
          variants='outline'
          onClick={() => setPreviewerOpen(!isPreviewerOpen)}
        >
          <i className='icon-container'>
            {isPreviewerOpen ? (
              <XLg className='h-5 w-4' />
            ) : (
              <FileEarmark className='h-5 w-4' />
            )}
          </i>
          <span className='ml-1 hidden capitalize sm:inline'>
            {isPreviewerOpen ? 'Close' : 'Preview'}
          </span>
        </Button>
      </div>
      <a
        target='_blank'
        href='https://github.com/thuyencode/markdown-previewer'
      >
        <Button variants='default'>
          <Github className='h-5 w-5' />
          <span className='hidden sm:inline'>Star me on Github</span>
        </Button>
      </a>
    </header>
  )
}
