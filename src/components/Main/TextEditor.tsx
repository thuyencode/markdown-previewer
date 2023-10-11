import { ComponentProps, forwardRef } from 'react'

type TextEditorProps = ComponentProps<'textarea'>

const TextEditor = forwardRef<HTMLTextAreaElement, TextEditorProps>((props, ref) => {
  return <textarea {...props} ref={ref} />
})

export default TextEditor
