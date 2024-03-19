import { ImageTemplateProps, TextTemplateProps } from '@/ts/defaultTemplate'
import { v4 as uuidv4 } from 'uuid'

export const defaultTextTemplates: Array<TextTemplateProps> = [
  {
    id: uuidv4(),
    text: '大标题',
    fontSize: '30px',
    fontWeight: 'bold',
    tag: 'h2'
  },
  {
    id: uuidv4(),
    text: '楷体副标题',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: '"KaiTi","STKaiti"',
    tag: 'h2'
  },
  { id: uuidv4(), text: '宋体正文内容', tag: 'p', fontFamily: '"SimSun","STSong"' },
  { id: uuidv4(), text: '正文内容', tag: 'p' },
  { id: uuidv4(), text: '链接内容', color: '#1890ff', textDecoration: 'underline', tag: 'p' },
  { id: uuidv4(), text: 'Arial style', tag: 'p', fontFamily: '"Arial", sans-serif' },
  { id: uuidv4(), text: 'Comic Sans', tag: 'p', fontFamily: '"Comic Sans MS"' },
  { id: uuidv4(), text: 'Courier New', tag: 'p', fontFamily: '"Courier New", monospace' },
  { id: uuidv4(), text: 'Times New Roman', tag: 'p', fontFamily: '"Times New Roman", serif' },
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
export const imgSourceList = [
  'http://static.imooc-lego.com/upload-files/logo-white-735536.png',
  'http://static.imooc-lego.com/upload-files/logo-black-049885.png',
  'http://static.imooc-lego.com/upload-files/528w-0ilmEQMomZ8-108048.png',
  'http://static.imooc-lego.com/upload-files/frame-096161.png',
  'http://static.imooc-lego.com/upload-files/text-449964.png',
  'http://static.imooc-lego.com/upload-files/text2-288504.png',
  'http://static.imooc-lego.com/upload-files/money-664239.png',
  'http://static.imooc-lego.com/upload-files/bag-904186.png',
  'http://static.imooc-lego.com/upload-files/text3-086652.png',
  'http://static.imooc-lego.com/upload-files/text4-145592.png'
]
export const defaultImageTemplates: Array<ImageTemplateProps> = imgSourceList.map(url => {
  return {
    id: uuidv4(),
    src: url,
    width: '150px'
  }
})
