import dayjs from 'dayjs'
import { isArray } from 'lodash-es'

import { Storage } from '@plasmohq/storage'

import {
  ADD_URLS,
  IS_OPEN,
  LAST_START_BROWSER_TIME,
  UPDATE_LAST_TIME_TASK,
} from '~types/common'
import { addHistory, deleteAllHistory } from '~utils/history'

export {}

const storage = new Storage({
  area: 'local',
})

// 每次启动浏览器时，判断上次启动浏览器的时间，如果超过14天，则清空所有历史记录
const diffStartTime = async () => {
  const lastTime = await storage.get(LAST_START_BROWSER_TIME)
  const isOpen = await storage.get<boolean>(IS_OPEN)
  const addUrls = await storage.get<string[]>(ADD_URLS)
  const currentTime = dayjs().valueOf()
  const diffDay = dayjs(currentTime).diff(dayjs(lastTime), 'day')

  // 如果差值大于14天，则清空所有历史记录
  if (diffDay > 14 && isOpen) {
    deleteAllHistory()
    if (isArray(addUrls) && addUrls.length > 0) {
      addUrls.forEach((url) => {
        addHistory(url)
      })
    }
  }
  // 更新上次启动浏览器的时间
  storage.set(LAST_START_BROWSER_TIME, currentTime)
}

// 浏览器启动时
chrome.runtime.onStartup.addListener(() => {
  diffStartTime()
})

chrome.runtime.onInstalled.addListener(() => {
  // 初始化上次启动浏览器的时间
  const currentTime = dayjs().valueOf()
  storage.set(LAST_START_BROWSER_TIME, currentTime)
  // 每隔5分钟，更新一次上次启动浏览器的时间
  chrome.alarms.create(UPDATE_LAST_TIME_TASK, { periodInMinutes: 5 })
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case UPDATE_LAST_TIME_TASK: {
      const currentTime = dayjs().valueOf()
      storage.set(LAST_START_BROWSER_TIME, currentTime)
      break
    }
    default: {
      break
    }
  }
})
