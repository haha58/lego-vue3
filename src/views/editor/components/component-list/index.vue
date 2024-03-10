<template>
  <div class="create-component-list">
    <div v-for="el in componentList" :key="el.id" class="component-item" @click="onItemClick(el)">
      <l-text v-bind="el"></l-text>
    </div>
    <a-upload
      v-model:file-list="imgUrl"
      name="file"
      :before-upload="commonUploadCheck"
      :custom-request="customRequest"
      :multiple="false"
      :max-count="1"
      @change="handleChange"
    >
      <a-button type="primary">
        <upload-outlined />
        上传图片
      </a-button>
    </a-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { TextTemplateProps } from '@/ts/defaultTemplate'
import { message, UploadChangeParam } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { AxiosInstance } from 'axios'
import { commonUploadCheck } from '@/utils/helper'
import { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface'
export default defineComponent({
  name: 'ComponentList',
  components: { UploadOutlined },
  props: {
    componentList: {
      type: Array<Partial<TextTemplateProps>>,
      required: true,
      default: () => []
    }
  },
  emits: ['onItemClick'],
  setup(_props, { emit }) {
    const imgUrl = ref([])
    const $axios = inject('$axios') as AxiosInstance
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
    const customRequest = (options: UploadRequestOption) => {
      console.log('options', options)
      const { file, onSuccess, onError } = options

      const formData = new FormData()
      formData.append('file', file)

      $axios
        .post('/utils/upload-img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(resp => {
          onSuccess?.(resp)
        })
        .catch(error => {
          onError?.(error)
        })
    }
    const handleChange = (info: UploadChangeParam) => {
      const fileInfo = info.file
      console.log(fileInfo)
      if (fileInfo.status === 'uploading') {
        return
      }
      if (fileInfo?.response?.errno !== 0 || fileInfo.status === 'error') {
        message.error(`${fileInfo.name} 上传失败`)
        return
      }
      if (fileInfo.status === 'done' && fileInfo?.response?.errno === 0) {
        message.success(`${info.file.name} 上传成功`)
        return
      }
    }
    return { imgUrl, onItemClick, handleChange, customRequest, commonUploadCheck }
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
