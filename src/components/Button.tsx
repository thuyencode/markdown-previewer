import cn from '@/utils/cn'
import { ComponentProps, ReactNode, forwardRef } from 'react'

type ButtonProps = {
  variants: 'default' | 'primary' | 'secondary' | 'outline'
  children: ReactNode
} & ComponentProps<'button'>

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const buttonVariants = {
    default: 'btn-default',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  } as const

  const { variants, children, className, ...otherProps } = props

  return (
    <button
      {...otherProps}
      className={cn(buttonVariants[variants], className)}
      ref={ref}
    >
      {children}
    </button>
  )
})

export default Button
