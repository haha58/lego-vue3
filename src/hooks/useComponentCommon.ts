import _ from 'lodash-es'
import { computed } from 'vue'
export default function useComponentCommon<T extends { [propname: string]: any }>(
  props: T,
  picks: string[]
) {
  // 因为style也是响应式改变的，所以需要加上computed
  const styleProps = computed(() => _.pick(props, picks))

  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      // window.location.href = props.url
    }
  }

  return {
    styleProps,
    handleClick
  }
}
