<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          <ComponentList :component-list="defaultTextTemplates" @on-item-click="addComponent" />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div id="canvas-area" class="preview-list">
            <EditWrapper
              v-for="component in components"
              :id="component.id"
              :key="component.id"
              class="l-text-wrapper"
              @on-item-click="setCurrentComponentId"
            >
              <close-outlined class="icon-close" @click="delComponent(component.id)" />
              <component :is="component.name" v-bind="component.props" />
            </EditWrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        组件属性
        <PropsTable
          v-if="currentElement"
          :current-element="currentElement"
          @change="updateComponent"
        />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import store from '@/store'
import { ComponentProps } from '@/store/modules/editor'
import { defaultTextTemplates } from '@/contant/defaultTemplate'
import {
  ADDCOMPONENT,
  DELCOMPONENT,
  SETCURRENTCOMPONENT,
  SETCURRENTCOMPONENTID,
  UPDATECOMPONENT
} from '@/store/mutation-type'
import LText from '@/components/l-text/index.vue'
import ComponentList from './components/component-list/index.vue'
import EditWrapper from './components/edit-wrapper/index.vue'
import PropsTable from './components/props-table/index.tsx'
import { TextComponentProps } from '@/ts/defaultProps'
export default defineComponent({
  name: 'EditorIndex',
  components: { LText, ComponentList, EditWrapper, PropsTable, CloseOutlined },
  setup() {
    const components = computed<ComponentProps[]>(() => store.state.editor.components)
    const currentElement = computed<ComponentProps>(() => store.getters[SETCURRENTCOMPONENT]())
    // 添加组件
    const addComponent = (componentData: ComponentProps) => {
      store.commit(ADDCOMPONENT, componentData)
    }
    // 删除组件
    const delComponent = (id: string) => {
      store.commit(DELCOMPONENT, id)
    }
    // 设置当前的组件id
    const setCurrentComponentId = (id: string) => {
      store.commit(SETCURRENTCOMPONENTID, id)
    }
    // 修改当前选中的状态
    const updateComponent = (e: { key: keyof TextComponentProps; value: string }) => {
      console.log('e', e)
      store.commit(UPDATECOMPONENT, e)
    }

    return {
      components,
      defaultTextTemplates,
      currentElement,
      addComponent,
      delComponent,
      setCurrentComponentId,
      updateComponent
    }
  }
})
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
./components/props-table/index.tsx
