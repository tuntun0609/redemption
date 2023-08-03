import { Button, ConfigProvider, Layout } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import 'dayjs/locale/zh-cn'

import zhCN from 'antd/locale/zh_CN'

import { Storage } from '@plasmohq/storage'

import { LAST_START_BROWSER_TIME } from '~types/common'
import { addHistory, deleteAllHistory } from '~utils/history'

import styles from './options.module.scss'

import 'antd/dist/reset.css'

import { Header } from '~components'

const { Content } = Layout

dayjs.locale('zh-cn')

const Options = () => {
  const [lastTime] = useStorage({
    key: LAST_START_BROWSER_TIME,
    instance: new Storage({
      area: 'local',
    }),
  })
  const lastTimeDayjs = useMemo(() => dayjs(lastTime), [lastTime])

  const die = () => {
    deleteAllHistory()
  }

  const add = () => {
    addHistory('https://www.baidu.com')
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.main}>
        <Header />
        <Content className={styles.content}>
          <div className={styles.contentMain}>
            <div>{lastTimeDayjs.format('YYYY.MM.DD HH:mm:ss:SSS')}</div>
            <Button onClick={die}>立即体验</Button>
            <Button onClick={add}>添加记录</Button>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default Options
