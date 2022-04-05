import React, { useState } from 'react'
import { RadioCard } from '../../../components/RadioCard'
import { ReactComponent as EditIcon } from './edit-icon.svg'
import { ReactComponent as BookIcon } from './book-icon.svg'

export default {
  title: 'Checkboxes/RadioCard',
  component: RadioCard,
}

export const PrimaryStory = (): JSX.Element => {
  const [selected, setSelected] = useState(0)

  const editSelect = () => {
    setSelected(1)
  }

  const bookSelect = () => {
    setSelected(2)
  }

  return (
    <div style={{ display: 'flex' }}>
      <RadioCard
        header="123"
        subHeader="Изменение условий"
        description="Новость об изменениях"
        selected={selected === 1}
        icon={EditIcon}
        onClick={editSelect}
      />
      <RadioCard
        className="ml-16"
        header="456"
        subHeader="Обучение"
        description="Сообщение про интерфейсы"
        selected={selected === 2}
        icon={BookIcon}
        onClick={bookSelect}
      />
      <RadioCard
        className="ml-16"
        header="789"
        subHeader="Обучение"
        description="Сообщение про интерфейсы"
        selected={selected === 3}
        icon={BookIcon}
        onClick={bookSelect}
        disabled
      />
    </div>
  )
}
