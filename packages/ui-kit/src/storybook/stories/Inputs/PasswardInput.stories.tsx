import React, { useState } from 'react'
import { PasswordInputProps, PasswordInput } from '../../../components/PasswordInput'

export default {
  title: 'Inputs/PasswordInput',
  component: PasswordInput,
}

export const PrimaryStory = (props: PasswordInputProps): JSX.Element => {
  const [value, setValue] = useState('')

  return <PasswordInput {...props} onChange={(v) => setValue(v)} value={value} />
}