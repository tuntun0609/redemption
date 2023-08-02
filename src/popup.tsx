import { Button, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import 'dayjs/locale/zh-cn'

import zhCN from 'antd/locale/zh_CN'

import { Storage } from '@plasmohq/storage'

import { LAST_START_BROWSER_TIME } from '~types/common'
import { addHistory, deleteAllHistory } from '~utils/history'

import styles from './popup.module.scss'

dayjs.locale('zh-cn')

function IndexPopup() {
  const [lastTime, setLastTime] = useStorage({
    key: LAST_START_BROWSER_TIME,
    instance: new Storage({
      area: 'local'
    })
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
      <div className={styles.main}>
        <div>{lastTimeDayjs.format('YYYY.MM.DD HH:mm:ss:SSS')}</div>
        <Button onClick={die}>立即体验</Button>
        <Button onClick={add}>添加记录</Button>
      </div>
    </ConfigProvider>
  )
}

export default IndexPopup
