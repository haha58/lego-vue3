<template>
  <div class="edit-wrapper" @click="onItemClick(id)">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditWrapper',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  emits: ['onItemClick'],
  setup(_props, { emit }) {
    const onItemClick = (id: string) => {
      emit('onItemClick', id)
    }
    return { onItemClick }
  }
})
</script>
<style>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>
