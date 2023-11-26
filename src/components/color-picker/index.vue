<template>
  <div class="lego-color-picker">
    <div class="native-color-container">
      <input :value="value" type="color" @input="handleColor($event)" />
    </div>
    <ul class="picked-color-list">
      <li v-for="(item, index) in colors" :key="index">
        <div
          :class="['color-item', !item && 'transparnet-back']"
          :style="{ background: item ? item : '' }"
          @click="handleColor(item)"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const defaultColors = [
  '#ffffff',
  '#f5222d',
  '#fa541c',
  '#fadb14',
  '#52c41a',
  '#1890ff',
  '#722ed1',
  '#8c8c8c',
  '#000000',
  ''
]
export default defineComponent({
  name: 'ColorPicker',
  props: {
    value: {
      type: String,
      required: true
    },
    colors: {
      type: Array<string>,
      required: false,
      default: defaultColors
    }
  },
  emits: ['change'],
  setup(_props, { emit }) {
    // 选中颜色
    const handleColor = (e: string | Event) => {
      // 处理vue3(ts)类型“EventTarget”上不存在属性“value”=> (e.target as HTMLInputElement).value)
      emit('change', typeof e === 'string' ? e : (e.target as HTMLInputElement).value)
    }
    return { handleColor }
  }
})
</script>

<style>
.lego-color-picker {
  display: flex;
}

.native-color-container {
  width: 40%;
}

.native-color-container input[type='color'] {
  width: 100%;
  cursor: pointer;
  height: 50px;
  border: 0;
  padding: 0;
  background-color: transparent;
}

.picked-color-list {
  padding: 0 0 0 5px;
  margin: 0;
  width: 60%;
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: space-between;
}

.picked-color-list li {
  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
}

.color-item {
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
}

.transparnet-back {
  background: url(../../assets/transparent.png) no-repeat;
}
</style>
