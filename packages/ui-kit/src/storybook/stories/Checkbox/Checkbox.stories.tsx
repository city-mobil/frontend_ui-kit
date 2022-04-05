import React, { useState } from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Checkbox, CheckboxProps } from '../../../components/Checkbox'
import styles from './Checkbox.module.scss'

export default {
  title: 'Checkboxes/Checkbox',
  component: Checkbox,
  decorators: [withKnobs],
}

export const PrimaryStory = ({ checked, ...props }: CheckboxProps) => {
  const [localChecked, setLocalChecked] = useState(checked)
  const onChange = (value: boolean) => {
    setLocalChecked(value)
  }

  return <Checkbox {...props} checked={localChecked} onChange={onChange} />
}

PrimaryStory.args = {
  label: 'Default label',
  checked: false,
}

export const StatesPreview = () => {
  const [checked, setChecked] = useState(false)
  const onChange = (checked: boolean) => {
    setChecked(checked)
  }

  return (
    <div className={styles.container}>
      <Checkbox checked={checked} onChange={onChange} />
      <Checkbox disabled checked={false} />
      <Checkbox disabled checked />
      <Checkbox checked={checked} onChange={onChange} label="Выполнили норму времени" />
      <Checkbox checked={checked} disabled onChange={onChange} label="Выполнили норму времени" />
      <Checkbox indetermined={true} checked={true} onChange={onChange} label="Indetermined=true checked=true" />
      <Checkbox indetermined={true} checked={false} onChange={onChange} label="Indetermined=true checked=false" />
      <Checkbox
        disabled
        indetermined={true}
        checked={false}
        onChange={onChange}
        label="disabled Indetermined=true checked=false"
      />
      <div className={styles.grid}>
        <Checkbox checked={checked} onChange={onChange} label="Checkbox in grid cell with auto size" />
      </div>
      <div className={styles.gridWithFixedColumn}>
        <Checkbox
          checked={checked}
          onChange={onChange}
          label="Checkbox in grid cell with fixed size, text to be clipped"
        />
      </div>
    </div>
  )
}

export const Group = () => {
  const initialCheckboxes = [
    { id: 1, name: 'Первый чекбокс', checked: false },
    { id: 2, name: 'Второй чекбокс', checked: false },
    { id: 3, name: 'Третий чекбокс', checked: false },
  ]
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes)
  const allChecked = checkboxes.every((checkbox) => checkbox.checked)
  const someChecked = checkboxes.some((checkbox) => checkbox.checked)
  const indetermined = someChecked && !allChecked
  const onChange = (isChecked: boolean, id: number) => {
    setCheckboxes(
      checkboxes.map((checkbox) =>
        checkbox.id === id
          ? {
              ...checkbox,
              checked: isChecked,
            }
          : checkbox,
      ),
    )
  }

  const onGroupChange = (isChecked: boolean) => {
    setCheckboxes(
      checkboxes.map((checkbox) => ({
        ...checkbox,
        checked: isChecked,
      })),
    )
  }

  return (
    <div className={styles.container}>
      <Checkbox indetermined={indetermined} checked={someChecked} onChange={onGroupChange} label="Группа чекбоксов" />
      <div className={styles.groupCheckbox}>
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            checked={checkbox.checked}
            onChange={(isChecked) => onChange(isChecked, checkbox.id)}
            label={checkbox.name}
          />
        ))}
      </div>
    </div>
  )
}
