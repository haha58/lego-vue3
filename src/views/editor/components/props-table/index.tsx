/* eslint-disable jsx-quotes */
import { AntdNameToComponent, mapPropsToForms } from '@/contant/mapPropsToForms'
import { ComponentProps } from '@/store/modules/editor'
import { TextComponentProps } from '@/ts/defaultProps'
import { PropsToForms, optionProps } from '@/ts/propsMap'
import { reduce } from 'lodash-es'
import { PropType, computed, defineComponent } from 'vue'
import { FormProps } from '../../interface'
import './index.less'

export default defineComponent({
  name: 'PropsTable',
  props: {
    currentElement: {
      type: Object as PropType<ComponentProps>,
      required: true
    }
  },
  emits: ['change'],
  setup(_props, { emit }) {
    const componentPropList = computed(() =>
      reduce(
        _props.currentElement.props,
        (result: PropsToForms, value: string, key: keyof TextComponentProps) => {
          const formItem: FormProps | undefined = mapPropsToForms[key]
          if (formItem) {
            const { initalTransform, afterTransform, eventName = 'change' } = formItem
            const _eventName = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1)
            const tempValue = value ?? ''
            formItem!.events = {
              [_eventName]: (e: any) => {
                emit('change', {
                  key,
                  value: afterTransform ? afterTransform(e) : e
                })
              }
            }
            formItem.value = initalTransform ? initalTransform(tempValue) : tempValue
            result[key] = formItem
          }
          return result
        },
        {} as Required<PropsToForms>
      )
    )

    //  Object.keys(componentPropList.value).map((item, index: number) => {这一段很重要
    //  在tsx中，例如"a-textarea"转成Input.TextArea
    return () => (
      <div class="props-table">
        {Object.keys(componentPropList.value).map((item, index: number) => {
          const componentItem = mapPropsToForms[item]
          const { componentName, extraProps, events, text, value, subComponentName, options } =
            componentItem
          const ComponentName = AntdNameToComponent[componentName]
          const SubComponentName = AntdNameToComponent[subComponentName]
          // 要传入value才会显示值
          const props = { ...extraProps, ...events, value }
          return (
            <div class="prop-item" key={index}>
              <span class="label">{text}</span>
              <div class="prop-component">
                {ComponentName && (
                  <>
                    <ComponentName {...props}>
                      {subComponentName &&
                        options &&
                        options.map((el: optionProps) => (
                          <SubComponentName value={el.value}>{el.label}</SubComponentName>
                        ))}
                    </ComponentName>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
})
