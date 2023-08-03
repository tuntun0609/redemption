import { GithubOutlined } from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import { type ReactNode } from 'react'

import { LinkIcon } from '~components'

import biliLogo from '../../../assets/bilibili-line.svg'
import logo from '../../../assets/icon.png'
import styles from './index.module.scss'

const { Header: AntHeader } = Layout

const linkMap: { link: string; icon: ReactNode | (() => ReactNode) }[] = [
  {
    link: 'https://github.com/tuntun0609/redemption',
    icon: <GithubOutlined className={styles.icon} />,
  },
  {
    link: 'https://space.bilibili.com/47706697',
    icon: <img src={biliLogo} className={styles.icon} />,
  },
]

export const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" className={styles.img} />
        <span className={styles.text}>Redemption</span>
      </div>
      <div className={styles.link}>
        {linkMap.map(({ link, icon: Icon }) => (
          <LinkIcon style={{ marginLeft: '10px' }} link={link} key={link}>
            {typeof Icon === 'function' ? Icon() : Icon}
          </LinkIcon>
        ))}
      </div>
    </AntHeader>
  )
}
