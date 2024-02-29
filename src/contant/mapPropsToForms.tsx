import ColorPicker from '@/components/color-picker/index.vue'
import { AntdNameToComponentProps, optionProps } from '@/ts/propsMap'
import { Input, InputNumber, Radio, Select, Slider } from 'ant-design-vue'
import { VNode } from 'vue'
// px转成数字
export const pxToNumberHandler = {
  componentName: 'a-input-number',
  initalTransform: (str: string) => parseInt(str),
  // 字号期待是px格式
  afterTransform: (e: number) => (e === null ? 0 : e) + 'px'
}

// 字体类型
export const fontFamilyList = [
  { label: '宋体', value: '"SimSun","STSong"' },
  { label: '黑体', value: '"SimHei","STHeiti"' },
  { label: '楷体', value: '"KaiTi","STKaiti"' },
  { label: '仿宋', value: '"FangSong","STFangsong"' }
]
// 使用h函数的方式实现！！
// const fontFamilyOptions = fontFamilyList.map(font => {
//   return {
//     value: font.value,
//     // eslint-disable-next-line object-curly-spacing
//     label: h('span', { style: { fontFamily: font.value } }, font.label)
//   }
// })
// 使用tsx的方式实现！！
export const fontFamilyOptions: optionProps[] = fontFamilyList.map(item => ({
  value: item.value,
  label: (<span style={{ fontFamily: item.value }}>{item.label}</span>) as VNode
}))
console.log('fontFamilyOptions', fontFamilyOptions)
export const mapPropsToForms: any = {
  text: {
    text: '文本',
    componentName: 'a-textarea',
    extraProps: { rows: 5 },
    afterTransform: (e: { target: { value: string } }) => e.target.value
  },
  fontSize: {
    text: '字号',
    ...pxToNumberHandler
  },
  lineHeight: {
    text: '行高',
    componentName: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    // 行高支持小数点，例如1.2
    initalTransform: (str: string) => parseFloat(str),
    // 行号期待是字符串
    afterTransform: (e: number) => String(e)
  },
  textAlign: {
    componentName: 'a-radio-group',
    subComponentName: 'a-radio-button',
    text: '对齐',
    options: [
      { value: 'left', label: '左' },
      { value: 'center', label: '中' },
      { value: 'right', label: '右' }
    ],
    // 字号期待是px格式
    afterTransform: (e: { target: { value: string } }) => e.target.value
  },
  fontFamily: {
    componentName: 'a-select',
    subComponentName: 'a-select-option',
    text: '字体',
    options: fontFamilyOptions
  },
  color: {
    componentName: 'color-picker',
    text: '字体颜色'
  },
  backgroundColor: {
    componentName: 'color-picker',
    text: '背景颜色'
  },
  width: {
    text: '宽度',
    ...pxToNumberHandler
  }
}

export const AntdNameToComponent: AntdNameToComponentProps = {
  'a-textarea': Input.TextArea,
  'a-input-number': InputNumber,
  'a-slider': Slider,
  'a-radio-group': Radio.Group,
  'a-radio-button': Radio.Button,
  'a-select': Select,
  'a-select-option': Select.Option,
  'color-picker': ColorPicker
}
