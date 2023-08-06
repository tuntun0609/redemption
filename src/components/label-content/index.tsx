import React, { type FC, type ReactNode } from 'react'

import styles from './index.module.scss'

interface LabelContentProps {
  label: string
  children: ReactNode | (() => ReactNode)
  className?: string
  style?: React.CSSProperties
}

export const LabelContent: FC<LabelContentProps> = ({
  label,
  children,
  className,
  style,
}) => (
  <div style={style} className={`${styles.main} ${className}`}>
    <div className={styles.label}>{label}</div>
    <div className={styles.content}>
      {typeof children === 'function' ? children() : children}
    </div>
  </div>
)
