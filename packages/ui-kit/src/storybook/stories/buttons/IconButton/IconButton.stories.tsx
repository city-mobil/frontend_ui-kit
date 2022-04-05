import React from 'react'
import { IconButton, IconButtonProps } from '../../../../components/Buttons'
import { ReactComponent as DownloadIcon } from '../../../../assets/svg/ic-download.svg'
import styles from './IconButton.module.scss'
import cx from 'classnames'

export default {
  title: 'Buttons/IconButton',
  component: IconButton,
}

export const PrimaryStory = (props: IconButtonProps) => <IconButton {...props} icon={DownloadIcon} />

PrimaryStory.args = {
  title: 'Скачать CSV',
}

PrimaryStory.argTypes = {
  icon: {
    description: 'React SVG component',
  },
}

export const StatesPreview = () => {
  return (
    <div className="mt-10">
      <div className={styles.row}>
        <IconButton icon={DownloadIcon} className="mr-16" size={'xs'} title="Скачать CSV" />
        <IconButton icon={DownloadIcon} className="mr-16" size={'sm'} title="Скачать CSV" />
        <IconButton icon={DownloadIcon} className="mr-16" size={'md'} title="Скачать CSV" />
      </div>
      <div className="mt-12">
        <IconButton icon={DownloadIcon} disabled className="mr-16" size={'xs'} title="Скачать CSV" />
        <IconButton icon={DownloadIcon} disabled className="mr-16" size={'sm'} title="Скачать CSV" />
        <IconButton icon={DownloadIcon} disabled className="mr-16" size={'md'} title="Скачать CSV" />
      </div>
      <div className={cx('mt-32', styles.row)}>
        <IconButton icon={DownloadIcon} className="mr-16" size={'xs'} />
        <IconButton icon={DownloadIcon} className="mr-16" size={'sm'} />
        <IconButton icon={DownloadIcon} className="mr-16" size={'md'} />
      </div>
      <div className={cx('mt-12', styles.row)}>
        <IconButton icon={DownloadIcon} disabled className="mr-16" size={'xs'} />
        <IconButton icon={DownloadIcon} disabled className="mr-16" size={'sm'} />
        <IconButton icon={DownloadIcon} disabled className="mr-16" size={'md'} />
      </div>
    </div>
  )
}
