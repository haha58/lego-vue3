<template>
  <div class="create-component-list">
    <div v-for="el in componentList" :key="el.id" class="component-item" @click="onItemClick(el)">
      <l-text v-bind="el"></l-text>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LText from '@/components/l-text/index.vue'
import { TextTemplateProps } from '@/ts/defaultTemplate'

export default defineComponent({
  name: 'ComponentList',
  components: { LText },
  props: {
    componentList: {
      type: Array<Partial<TextTemplateProps>>,
      required: true,
      default: () => []
    }
  },
  emits: ['onItemClick'],
  setup(_props, { emit }) {
    // 点击组件
    const onItemClick = (el: Partial<TextTemplateProps>) => {
      const { id, ...arg } = el
      const componentData = {
        id,
        name: 'l-text',
        props: { ...arg }
      }
      emit('onItemClick', componentData)
    }
    return { onItemClick }
  }
})
</script>

<style lang="less" scoped>
.component-wrapper {
  width: 100px;
  position: relative;
  display: flex;
  align-items: center;
}
.tip-text {
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
  margin-top: -10px;
}
.inside-component {
  width: 100px !important;
}
.image-list {
  display: flex;
  flex-wrap: wrap;
  width: 220px;
  margin: 20px auto;
}
.image-list img {
  max-height: 150px;
  object-fit: contain;
}
.item-image {
  margin-right: 10px;
}
.component-item {
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.create-component-list .uploader-container {
  padding: 10px;
  color: #ffffff;
  background: #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.create-component-list .uploader-container:hover {
  background: #40a9ff;
}
.create-component-list .uploader-container h4 {
  color: #ffffff;
  margin-bottom: 0;
  margin-left: 10px;
}
.create-component-list .ant-tabs-tab {
  margin: 0;
}
</style>
