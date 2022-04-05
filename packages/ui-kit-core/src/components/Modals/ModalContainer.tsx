import React, { FC } from 'react'

import styles from './Modals.module.scss'

export const ModalContainer: FC = ({ children }) => <div className={styles.wrapper}>{children}</div>
