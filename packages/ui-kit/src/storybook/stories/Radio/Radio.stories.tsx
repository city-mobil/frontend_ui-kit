import React, { ReactText, useState } from 'react'
import { Radio } from '../../../components/Radio'
import { Radio as RadioForDocGen } from '../../../components/Radio'
import { Input } from '../../../components/Input'

export default {
  title: 'Checkboxes/Radio',
  component: RadioForDocGen,
  subcomponents: {
    'Radio.Group': Radio.Group,
  },
}

export const StatesPreview = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
    <Radio value={1}>Default</Radio>
    <Radio value={2} checked>
      Checked
    </Radio>
    <Radio value={3} description="Some details">
      With descr
    </Radio>
    <Radio value={4} disabled>
      Disabled
    </Radio>
    <Radio value={5} checked disabled>
      Checked + disabled
    </Radio>
  </div>
)

const storyDescription = `
* Used to select a single state from multiple options.

### States preview
`
StatesPreview.parameters = {
  docs: {
    storyDescription,
  },
}

export const UncontrolledRadioGroup = () => (
  <Radio.Group onChange={(v) => console.log(v)}>
    <Radio value={1}>Radio option #1</Radio>
    <Radio value={2}>Radio option #2</Radio>
    <Radio value={3}>Radio option #3</Radio>
  </Radio.Group>
)

export const ControlledRadioGroup = () => {
  const [value, setValue] = useState<ReactText>(1)

  return (
    <Radio.Group value={value} onChange={(v) => setValue(v)}>
      <Radio value={1}>Radio option #1</Radio>
      <Radio value={2}>Radio option #2</Radio>
      <Radio value={3}>Radio option #3</Radio>
    </Radio.Group>
  )
}

export const NestedRadioGroup = () => {
  const [value, setValue] = useState<ReactText>(1)

  return (
    <Radio.Group disabled vertical value={value} onChange={(v) => setValue(v)}>
      <Radio value={1}>Radio option #1</Radio>
      <Radio.Group vertical>
        <Radio value={2}>Nested radio option #2</Radio>
        <Radio value={3}>Nested radio option #3</Radio>
        <Radio.Group>
          <Radio value={4}>Double nested radio #4</Radio>
          <Radio value={5}>Double nested radio #5</Radio>
        </Radio.Group>
        <Radio value={6}>Nested radio option #6</Radio>
      </Radio.Group>
      <Radio value={7}>Radio option #7</Radio>
      <Radio value={8}>Radio option #8</Radio>
    </Radio.Group>
  )
}

const NestedRadioGroupDescription = `
Nested \`<Radio.Group>\` gets the same \`value\`, \`onChange\` and \`name\` as parent \`<Radio.Group>\` via context if no other provided.

\`disabled\` prop is not taken in nested group from parent.
`
NestedRadioGroup.parameters = {
  docs: {
    NestedRadioGroupDescription,
  },
}

export const CustomLabel = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Radio.Group vertical>
      <Radio value={1}>Option #1</Radio>
      <Radio value={2}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>Other</div>
          <Input value={inputValue} onChange={(v) => setInputValue(v)} />
        </div>
      </Radio>
    </Radio.Group>
  )
}

const CustomLabelDescription = `
Children can be any component you want.
`
CustomLabel.parameters = {
  docs: {
    CustomLabelDescription,
  },
}
