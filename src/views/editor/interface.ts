export interface FormProps {
  componentName: string
  subComponentName?: string
  options?: {
    label: string
    value: string
  }[]
  value?: string
  text: string
  // 组件的额外属性
  extraProps?: {
    [key: string]: any
  }
  initalTransform?: (v: any) => any
  afterTransform?: (v: any) => any
  eventName: string
  events: { [key: string]: (e: any) => void }
}
