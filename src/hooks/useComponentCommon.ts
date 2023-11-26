import _ from 'lodash-es'

export default function useComponentCommon<T extends { [propname: string]: any }>(
  props: T,
  picks: string[]
) {
  const styleProps = _.pick(props, picks)

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
