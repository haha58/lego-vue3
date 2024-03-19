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
const defaultMap = {
  componentName: 'a-input',
  eventName: 'change',
  valueProp: 'value',
  initalTransform: (v: any) => v,
  afterTransform: (e: any) => e
}
export const mapPropsToForms: any = {
  text: {
    ...defaultMap,
    text: '文本',
    componentName: 'a-textarea',
    extraProps: { rows: 5 },
    afterTransform: (e: { target: { value: string } }) => e.target.value
  },
  href: {
    ...defaultMap,
    afterTransform: (e: any) => e.target.value,
    text: '链接'
  },
  fontSize: {
    text: '字号',
    ...pxToNumberHandler
  },
  lineHeight: {
    ...defaultMap,
    text: '行高',
    componentName: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    // 行高支持小数点，例如1.2
    initalTransform: (str: string) => parseFloat(str),
    // 行号期待是字符串
    afterTransform: (e: number) => String(e)
  },
  textAlign: {
    ...defaultMap,
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
    ...defaultMap,
    componentName: 'a-select',
    subComponentName: 'a-select-option',
    text: '字体',
    options: [{ value: '', text: '无' }, ...fontFamilyOptions]
  },
  fontWeight: {
    ...defaultMap,
    component: 'icon-switch',
    intialTransform: (v: string) => v === 'bold',
    afterTransform: (e: boolean) => (e ? 'bold' : 'normal'),
    valueProp: 'checked',
    extraProps: { iconName: 'BoldOutlined', tip: '加粗' }
  },
  fontStyle: {
    ...defaultMap,
    component: 'icon-switch',
    intialTransform: (v: string) => v === 'italic',
    afterTransform: (e: boolean) => (e ? 'italic' : 'normal'),
    valueProp: 'checked',
    extraProps: { iconName: 'ItalicOutlined', tip: '斜体' }
  },
  textDecoration: {
    ...defaultMap,
    component: 'icon-switch',
    intialTransform: (v: string) => v === 'underline',
    afterTransform: (e: boolean) => (e ? 'underline' : 'none'),
    valueProp: 'checked',
    extraProps: { iconName: 'UnderlineOutlined', tip: '下划线' }
  },
  color: {
    ...defaultMap,
    componentName: 'color-picker',
    text: '字体颜色'
  },
  backgroundColor: {
    ...defaultMap,
    componentName: 'color-picker',
    text: '背景颜色'
  },
  width: {
    ...defaultMap,
    text: '宽度',
    ...pxToNumberHandler
  },
  height: {
    ...defaultMap,
    text: '高度',
    ...pxToNumberHandler
  },
  // actions
  actionType: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '点击',
    options: [
      { value: '', text: '无' },
      { value: 'to', text: '跳转到 URL' }
    ]
  },
  url: {
    ...defaultMap,
    afterTransform: (e: any) => e.target.value,
    text: '链接',
    parent: 'actionType'
  },
  paddingLeft: {
    ...pxToNumberHandler,
    text: '左边距'
  },
  paddingRight: {
    ...pxToNumberHandler,
    text: '右边距'
  },
  paddingTop: {
    ...pxToNumberHandler,
    text: '上边距'
  },
  paddingBottom: {
    ...pxToNumberHandler,
    text: '下边距'
  },
  // border types
  borderStyle: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '边框类型',
    options: [
      { value: 'none', text: '无' },
      { value: 'solid', text: '实线' },
      { value: 'dashed', text: '破折线' },
      { value: 'dotted', text: '点状线' }
    ]
  },
  borderColor: {
    ...defaultMap,
    component: 'color-picker',
    text: '边框颜色'
  },
  borderWidth: {
    ...defaultMap,
    component: 'a-slider',
    intialTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => e + 'px',
    text: '边框宽度',
    extraProps: { min: 0, max: 20 }
  },
  borderRadius: {
    ...defaultMap,
    component: 'a-slider',
    intialTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => e + 'px',
    text: '边框圆角',
    extraProps: { min: 0, max: 200 }
  },
  // shadow and opactiy
  opacity: {
    ...defaultMap,
    component: 'a-slider',
    text: '透明度',
    intialTransform: (v: number) => (v ? v * 100 : 100),
    afterTransform: (e: number) => e / 100,
    extraProps: { min: 0, max: 100, reverse: true }
  },
  boxShadow: {
    ...defaultMap,
    component: 'shadow-picker'
  },
  position: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '定位',
    options: [
      { value: '', text: '默认' },
      { value: 'absolute', text: '绝对定位' }
    ]
  },
  left: {
    ...pxToNumberHandler,
    text: 'X轴坐标'
  },
  top: {
    ...pxToNumberHandler,
    text: 'Y轴坐标'
  },
  imageSrc: {
    ...defaultMap,
    component: 'image-processer'
  },
  backgroundSize: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '背景大小',
    options: [
      { value: 'contain', text: '自动缩放' },
      { value: 'cover', text: '自动填充' },
      { value: '', text: '默认' }
    ]
  },
  backgroundRepeat: {
    ...defaultMap,
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '背景重复',
    options: [
      { value: 'no-repeat', text: '无重复' },
      { value: 'repeat-x', text: 'X轴重复' },
      { value: 'repeat-y', text: 'Y轴重复' },
      { value: 'repeat', text: '全部重复' }
    ]
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
