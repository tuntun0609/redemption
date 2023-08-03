import { Button } from 'antd'
import type React from 'react'
import { type FC } from 'react'

import styles from './index.module.scss'

interface LinkIconProps {
  link: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const LinkIcon: FC<LinkIconProps> = ({
  link,
  children,
  className,
  style,
}) => (
  <Button style={style} className={`${styles.btn} ${className}`} type="text">
    <a href={link} target="_blank" rel="nofollow noopener noreferrer">
      {children}
    </a>
  </Button>
)
