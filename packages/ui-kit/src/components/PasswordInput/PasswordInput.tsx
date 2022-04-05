import React, { forwardRef, useState } from 'react'

import { ReactComponent as InvisibleIcon } from '../../assets/svg/ic-invisible.svg'
import { ReactComponent as VisibleIcon } from '../../assets/svg/ic-visible.svg'
import { Input, InputProps } from '../Input'

export type PasswordInputProps = Omit<InputProps, 'suffixIcon' | 'onSuffixIconClick'> & { initialVisible?: boolean }

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { initialVisible = true, ...rest } = props
  const [isHidden, setIsHidden] = useState(initialVisible)

  const handleToggleShowPassword = (): void => {
    setIsHidden((currentIsHidden) => !currentIsHidden)
  }

  return (
    <Input
      {...rest}
      ref={ref}
      type={isHidden ? 'password' : 'text'}
      suffixIcon={isHidden ? InvisibleIcon : VisibleIcon}
      onSuffixIconClick={handleToggleShowPassword}
    />
  )
})

PasswordInput.displayName = 'PasswordInput'
