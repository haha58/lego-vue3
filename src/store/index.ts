import { createStore } from 'vuex'

import user, { UserProps } from './modules/user'
import templates, { TemplatesProps } from './modules/templates'
import editor, { EditorProps } from './modules/editor'
export interface GloabalDataProps {
  user: UserProps
  templates: TemplatesProps
  editor: EditorProps
}

const store = createStore<GloabalDataProps>({
  modules: {
    user,
    templates,
    editor
  }
})

export default store
