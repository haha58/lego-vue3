import { TextTemplateProps } from '@/ts/defaultTemplate'
import { v4 as uuidv4 } from 'uuid'

export const defaultTextTemplates: Array<Partial<TextTemplateProps>> = [
  {
    id: uuidv4(),
    text: '大标题',
    fontSize: '30px',
    fontWeight: 'bold',
    tag: 'h2'
  },
  { id: uuidv4(), text: '正文内容', tag: 'p' },
  { id: uuidv4(), text: '链接内容', color: '#1890ff', textDecoration: 'underline', tag: 'p' },
  {
    id: uuidv4(),
    text: '按钮内容',
    color: '#ffffff',
    backgroundColor: '#1890ff',
    borderWidth: '1px',
    borderColor: '#1890ff',
    borderStyle: 'solid',
    borderRadius: '2px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '100px',
    tag: 'button',
    textAlign: 'center'
  }
]
