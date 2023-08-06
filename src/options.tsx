import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Layout,
  message,
  Row,
  Space,
  Table,
} from 'antd'
import dayjs from 'dayjs'

import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'

import 'dayjs/locale/zh-cn'

import zhCN from 'antd/locale/zh_CN'

import styles from './options.module.scss'

import 'antd/dist/reset.css'

import type { ColumnsType } from 'antd/es/table'

import { Header } from '~components'
import { ADD_URLS } from '~types/common'

const { Content } = Layout

dayjs.locale('zh-cn')

const urlPattern =
  /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/

const Options = () => {
  const [addUrls, setAddUrls] = useStorage<string[]>(
    {
      key: ADD_URLS,
      instance: new Storage({
        area: 'local',
      }),
    },
    [],
  )
  const [form] = Form.useForm()

  const columns: ColumnsType<{ url: string }> = [
    {
      title: '网址',
      dataIndex: 'url',
      key: 'url',
      render: (url) => (
        <a href={url} target="_blank" rel="nofollow noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: '操作',
      width: 100,
      render: (_, { url: currentUrl }) => (
        <a
          onClick={() =>
            setAddUrls(addUrls.filter((url) => url !== currentUrl))
          }>
          删除
        </a>
      ),
    },
  ]

  const onAddUrl = async (data: { addUrl: string }) => {
    if (!addUrls.includes(data.addUrl?.trim())) {
      setAddUrls([...addUrls, data.addUrl.trim()])
      form.resetFields()
    } else {
      message.error('已存在该网址')
    }
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.main}>
        <Header />
        <Content className={styles.content}>
          <div className={styles.contentMain}>
            <Form onFinish={onAddUrl} form={form}>
              <Form.Item label="重置后插入的网址" className={styles.inputItem}>
                <div className={styles.inputContent}>
                  <Form.Item
                    noStyle
                    name={'addUrl'}
                    rules={[
                      {
                        required: true,
                        message: '请输入网址',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            urlPattern.test(getFieldValue('addUrl')?.trim())
                          ) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('请输入正确的网址'))
                        },
                      }),
                    ]}>
                    <Input className={styles.input} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    添加
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Table
              dataSource={addUrls?.map((url) => ({ url })) ?? []}
              columns={columns}
              rowKey="url"
              pagination={{
                pageSize: 20,
              }}
            />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default Options
