import { Button, ConfigProvider, Space, Switch } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import 'dayjs/locale/zh-cn'

import zhCN from 'antd/locale/zh_CN'
import { isArray } from 'lodash-es'

import { Storage } from '@plasmohq/storage'

import { LabelContent } from '~components'
import { ADD_URLS, IS_OPEN, LAST_START_BROWSER_TIME } from '~types/common'
import { addHistory, deleteAllHistory } from '~utils/history'

import styles from './popup.module.scss'

dayjs.locale('zh-cn')

function IndexPopup() {
  const [lastTime] = useStorage({
    key: LAST_START_BROWSER_TIME,
    instance: new Storage({
      area: 'local',
    }),
  })
  const [addUrls] = useStorage<string[]>(
    {
      key: ADD_URLS,
      instance: new Storage({
        area: 'local',
      }),
    },
    [],
  )

  const [isOpen, setIsOpen] = useStorage(
    {
      key: IS_OPEN,
      instance: new Storage({
        area: 'local',
      }),
    },
    false,
  )
  const lastTimeDayjs = useMemo(() => dayjs(lastTime), [lastTime])

  const die = () => {
    deleteAllHistory()
    if (isArray(addUrls) && addUrls.length > 0) {
      addUrls.forEach((url) => {
        addHistory(url)
      })
    }
  }

  const setAddUrls = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.main}>
        <Space className={styles['w-100']} direction="vertical">
          <LabelContent label="是否开启">
            <Switch checked={isOpen} onChange={(value) => setIsOpen(value)} />
          </LabelContent>
          <LabelContent label="上次活跃时间">
            <div>{lastTimeDayjs.format('YYYY.MM.DD')}</div>
          </LabelContent>
          <Button className={styles['w-100']} onClick={die}>
            立即体验重生
          </Button>
          <Button className={styles['w-100']} onClick={setAddUrls}>
            设置初始化网址
          </Button>
        </Space>
      </div>
    </ConfigProvider>
  )
}

export default IndexPopup
