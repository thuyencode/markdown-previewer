import useAppContext from '@/hooks/useAppContext'
import { md } from '@/utils/markdownIt.js'
import 'github-markdown-css/github-markdown.css'
import { ComponentProps, forwardRef, useEffect } from 'react'

type MarkdownPreviewerProps = {
  preview: string
} & ComponentProps<'div'>

const MarkdownPreviewer = forwardRef<HTMLDivElement, MarkdownPreviewerProps>(
  (props, ref) => {
    const { setPreviewerLoading } = useAppContext()
    const { preview, ...otherProps } = props

    useEffect(() => {
      setPreviewerLoading(false)

      return () => setPreviewerLoading(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div
        {...otherProps}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: md.render(preview) }}
      />
    )
  }
)

export default MarkdownPreviewer
