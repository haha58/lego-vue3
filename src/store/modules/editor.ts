import { v4 as uuidv4 } from 'uuid'
import { Module } from 'vuex'
import { GloabalDataProps } from '..'
import { ImageComponentProps, TextComponentProps } from '@/ts/defaultProps'
import {
  ADDCOMPONENT,
  DELCOMPONENT,
  SETCURRENTCOMPONENT,
  SETCURRENTCOMPONENTID,
  UPDATECOMPONENT
} from '../mutation-type'

export interface ComponentProps {
  // 组件id
  id: string
  // 动态渲染的组件名称
  name: 'l-text' | 'l-image'
  // 组件中定义的元素属性'
  // Partial 快速把某个接口类型中定义的所有属性变成可选的
  props: Partial<TextComponentProps & ImageComponentProps & { tag: string }>
}

// 测试数据
const testComponents: ComponentProps[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: '你好1',
      fontSize: '24px',
      color: '#000000',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: '楷体'
    }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: '你好2',
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: '黑体'
    }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: '你好',
      fontSize: '19px',
      actionType: 'url',
      url: 'https://www.baidu.com',
      lineHeight: '3',
      textAlign: 'left',
      fontFamily: '仿宋'
    }
  }
]

export interface EditorProps {
  // 编辑器中渲染的组件列表
  components: ComponentProps[]
  // 当前正在编辑的元素，内容为uuid
  currentElementId: string
}

// 两个参数 第一个本地的interface，第二个是全局的interface
const editor: Module<EditorProps, GloabalDataProps> = {
  state: {
    components: testComponents,
    currentElementId: ''
  },
  mutations: {
    [ADDCOMPONENT](state: EditorProps, componentData: ComponentProps) {
      state.components.push(componentData)
    },
    [DELCOMPONENT](state: EditorProps, id: string) {
      const tempList = state.components.filter(item => item.id !== id)
      state.components = tempList
    },
    [SETCURRENTCOMPONENTID](state: EditorProps, id: string) {
      state.currentElementId = id
    },
    [UPDATECOMPONENT](
      state: EditorProps,
      payload: { key: keyof TextComponentProps; value: string }
    ) {
      const { key, value } = payload
      const _currentElement = state.components.find(item => item.id === state.currentElementId)
      _currentElement?.props && (_currentElement!.props[key] = value)
      console.log('_currentElement', _currentElement)
    }
  },
  getters: {
    [SETCURRENTCOMPONENT](state) {
      return (): ComponentProps | undefined =>
        state.components.find(item => item.id === state.currentElementId)
    }
  }
}

export default editor
