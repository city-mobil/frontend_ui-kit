import React from 'react'
import styles from './styles.module.scss'
import { ProgressBar } from '../../..'
import { ReactComponent as Icon } from '../../../assets/svg/ic-success.svg'
import { ProgressBarProps } from '../../../components/ProgressBar'

export default {
  title: 'ProgressBar/ProgressBar',
  component: ProgressBar,
}

export const PrimaryStory = (props: ProgressBarProps) => <ProgressBar {...props} />

PrimaryStory.args = {
  percent: 50,
}

PrimaryStory.argTypes = {
  label: {
    control: null,
  },
}

export const StatesPreview = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.note}>With text</div>
        <ProgressBar percent={50} label={'50 из 100'} />
      </div>
      <div className={styles.wrapperLg}>
        <div className={styles.note}>With ReactNode</div>
        <ProgressBar percent={70} label={<Icon className="ml-4 mb-4" />} />
      </div>
    </>
  )
}
