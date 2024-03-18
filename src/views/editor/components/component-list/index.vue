<template>
  <div class="create-component-list">
    <a-tabs>
      <a-tab-pane key="1">
        <template #tab>
          <span>
            <FieldStringOutlined />
            文本
          </span>
        </template>
        <div
          v-for="el in defaultTextTemplates"
          :key="el.id"
          class="component-item"
          @click="onItemClick(el, 'l-text')"
        >
          <l-text v-bind="el"></l-text>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>
            <FileImageOutlined />
            图片
          </span>
        </template>
        <div class="image-list">
          <div
            v-for="el in defaultImageTemplates"
            :key="el.id"
            class="component-item item-image"
            @click="onItemClick(el, 'l-image')"
          >
            <div class="component-wrapper">
              <l-image v-bind="el" class="inside-component"></l-image>
            </div>
          </div>
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
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
// import LImage from '@/components/l-image.vue'
import { defineComponent, inject, ref } from 'vue'
import { TextTemplateProps } from '@/ts/defaultTemplate'
import { message, UploadChangeParam } from 'ant-design-vue'
import { UploadOutlined, FieldStringOutlined, FileImageOutlined } from '@ant-design/icons-vue'
import { AxiosInstance } from 'axios'
import { commonUploadCheck } from '@/utils/helper'
import { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface'
import { defaultTextTemplates, defaultImageTemplates } from '@/contant/defaultTemplate'
import { v4 as uuidv4 } from 'uuid'
export default defineComponent({
  name: 'ComponentList',
  components: { UploadOutlined, FieldStringOutlined, FileImageOutlined },
  props: {},
  emits: ['onItemClick'],
  setup(_props, { emit }) {
    const imgUrl = ref([])
    const $axios = inject('$axios') as AxiosInstance
    // 点击组件
    const onItemClick = (el: Partial<TextTemplateProps>, type: 'l-text' | 'l-image') => {
      console.log(el)
      const { id, ...arg } = el
      const componentData = {
        id,
        name: type,
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
        const componentData = {
          id: uuidv4(),
          name: 'l-image',
          props: { src: fileInfo?.response?.data?.urls[0] }
        }
        emit('onItemClick', componentData)
        return
      }
    }
    return {
      imgUrl,
      defaultTextTemplates,
      defaultImageTemplates,
      onItemClick,
      handleChange,
      customRequest,
      commonUploadCheck
    }
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
