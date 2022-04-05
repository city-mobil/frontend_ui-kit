import React from 'react'
import { ErrorPage, ErrorPageBaseProps, ErrorIcons } from '../../../components/ErrorPage'

export default {
  title: 'Info/ErrorPage',
}

export const PrimaryStory = ({ icon, ...props }: ErrorPageBaseProps): JSX.Element => {
  const Component = ErrorPage[icon]

  return <Component {...props} />
}

PrimaryStory.args = {
  icon: 'Error502',
  title: 'Oops',
  content:
    'Не удалось найти страницу, которую вы ищете. Проверьте правильность введенного адреса или воспользуйтесь меню.',
  button: { name: 'Перейти на главную ' },
}

PrimaryStory.argTypes = {
  icon: {
    control: {
      type: 'select',
      options: ['Error403', 'Error404', 'Error500', 'Error501', 'Error502', 'Error503', 'Error50X', 'ErrorFront'],
    },
  },
}

export const HiddenButton: React.FC = () => (
  <ErrorPage.Error404
    title="Упс :("
    content="Не удалось найти страницу, которую вы ищете. Проверьте правильность введенного адреса или воспользуйтесь меню."
    button={{ name: 'Перейти на главную', isHidden: true }}
  />
)

export const Icon: React.FC = () => <ErrorIcons.Error502 />
