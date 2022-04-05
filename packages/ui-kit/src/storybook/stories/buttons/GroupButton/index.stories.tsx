import React from 'react'
import { GroupButton, GroupButtonOption, GroupButtonProps } from '../../../../components/Buttons'
import { Size } from '../../../../types'

export default {
  title: 'Buttons/GroupButton',
  component: GroupButton,
}

const primaryStoryOptions = [
  {
    value: 'option1',
    label: 'Option #1',
  },
  {
    value: 'option2',
    label: 'Option #2',
  },
]

export const PrimaryStory = (props: GroupButtonProps) => <GroupButton {...props} />

PrimaryStory.args = {
  options: primaryStoryOptions,
  selectedOption: 'option1',
  size: 'md',
  onChange: () => {},
}

PrimaryStory.argTypes = {
  selectedOption: {
    control: {
      type: 'select',
      options: primaryStoryOptions.map((item) => item.value),
    },
  },
}

const doubleOptions = [
  {
    value: 'option1',
    label: 'Option #1',
  },
  {
    value: 'option2',
    label: 'Option #2',
  },
]

const tripleOptions = [
  {
    value: 'option1',
    label: 'Option #1',
  },
  {
    value: 'option2',
    label: 'Option #2',
  },
  {
    value: 'option3',
    label: 'Option #3',
  },
]

const Container = ({
  size,
  options,
  fullWidth = false,
}: {
  size: Size
  options: GroupButtonOption[]
  fullWidth?: boolean
}) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0].value)

  return (
    <div style={{ marginBottom: '30px' }}>
      <GroupButton
        size={size}
        options={options}
        selectedOption={selectedOption as string}
        onChange={(value) => setSelectedOption(value)}
        fullWidth={fullWidth}
      />
    </div>
  )
}

export const StatesPreview = () => (
  <div>
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '30px', minWidth: '300px' }}>
        <Container size="xs" options={doubleOptions} />
        <Container size="sm" options={doubleOptions} />
        <Container size="md" options={doubleOptions} />
        <Container size="lg" options={doubleOptions} />
      </div>

      <div>
        <Container size="xs" options={tripleOptions} />
        <Container size="sm" options={tripleOptions} />
        <Container size="md" options={tripleOptions} />
        <Container size="lg" options={tripleOptions} />
      </div>
    </div>

    <div style={{ margin: '50px 0 20px' }}>With full width fills container, no fixed paddings</div>
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '30px', flex: '1' }}>
        <Container size="xs" options={doubleOptions} fullWidth />
        <Container size="sm" options={doubleOptions} fullWidth />
        <Container size="md" options={doubleOptions} fullWidth />
        <Container size="lg" options={doubleOptions} fullWidth />
      </div>

      <div style={{ flex: '1' }}>
        <Container size="xs" options={tripleOptions} fullWidth />
        <Container size="sm" options={tripleOptions} fullWidth />
        <Container size="md" options={tripleOptions} fullWidth />
        <Container size="lg" options={tripleOptions} fullWidth />
      </div>
    </div>
  </div>
)
