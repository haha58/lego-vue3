import { createStore } from 'vuex'
import { AxiosRequestConfig } from 'axios'
import user, { UserProps } from './modules/user'
import templates, { TemplatesProps } from './modules/templates'
import editor, { EditorProps } from './modules/editor'
export interface GlobalStatus {
  loading: boolean
  error: any
  opName?: string
}
export interface GloabalDataProps {
  user: UserProps
  // 全局状态，loading，error 等等
  status: GlobalStatus
  templates: TemplatesProps
  editor: EditorProps
}
export type ICustomAxiosConfig = AxiosRequestConfig & {
  mutationName: string
}
const store = createStore<GloabalDataProps>({
  state: {
    user: {} as UserProps,
    status: { loading: false, error: { status: false, message: '' }, opName: '' },
    templates: {} as TemplatesProps,
    editor: {} as EditorProps
  },
  mutations: {
    setLoading(state, { status, opName }) {
      state.status.loading = status
      if (opName) {
        state.status.opName = opName
      }
    },
    setError(state, e) {
      state.status.error = e
    }
  },
  modules: {
    user,
    templates,
    editor
  }
})

export default store
