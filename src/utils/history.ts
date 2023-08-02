// 删除所有浏览器历史记录
export const deleteAllHistory = async () => {
  chrome.history.deleteAll()
}

// 添加浏览器历史记录
export const addHistory = async (url: string) => {
  chrome.history.addUrl({
    url,
  })
}
