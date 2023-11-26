import { Module } from 'vuex'
import { GloabalDataProps } from '..'
import { GETTEMPLATEBYID } from '../mutation-type'

export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
}

export const testData: TemplateProps[] = [
  {
    id: 1,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: 'test title 1',
    author: 'viking',
    copiedCount: 1
  },
  {
    id: 2,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: '前端架构师直播海报',
    author: 'viking',
    copiedCount: 1
  },
  {
    id: 3,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-682056.png',
    title: '前端架构师直播海报',
    author: 'viking',
    copiedCount: 1
  },
  {
    id: 4,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: '前端架构师直播海报',
    author: 'viking',
    copiedCount: 1
  },
  {
    id: 5,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: '前端架构师直播海报',
    author: 'viking',
    copiedCount: 1
  },
  {
    id: 6,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: '前端架构师直播海报',
    author: 'viking',
    copiedCount: 1
  }
]

export interface TemplatesProps {
  templateList: TemplateProps[]
}

// 两个参数 第一个本地的interface，第二个是全局的interface
const templates: Module<TemplatesProps, GloabalDataProps> = {
  state: {
    templateList: testData
  },
  getters: {
    [GETTEMPLATEBYID](state) {
      return (templateId: number): TemplateProps | undefined =>
        state.templateList.find(item => item.id === templateId)
    }
  }
}

export default templates
