import { InfoPanel, InfoPanelBaseProps } from '../../../components/InfoPanel'
import React from 'react'

export default {
  title: 'Info/InfoPanel',
  component: InfoPanel,
}

export const PrimaryStory = ({ icon, ...props }: InfoPanelBaseProps): JSX.Element => {
  const Component = InfoPanel[icon]

  return <Component {...props} />
}

PrimaryStory.args = {
  icon: 'NoData',
  title: 'Ничего не найдено',
  content: 'Записи с данными значениями не найдены. Попробуйте изменить параметры фильтрации',
  variant: 'normal',
  button: { name: 'Перейти на главную ' },
}

PrimaryStory.argTypes = {
  icon: {
    control: {
      type: 'select',
      options: ['NoData', 'NotFound', 'NoVehicle', 'NotLoading'],
    },
  },
}

export const CustomButton = (): JSX.Element => {
  return (
    <InfoPanel.NoData
      title="Заголовок"
      content="Контент"
      variant="error"
      button={{ variant: 'primary', size: 'lg', name: 'Любая кнопка' }}
    />
  )
}
