import { ImageComponentProps, TextComponentProps, TextTagProps } from './defaultProps'

interface RequiredComponentProps {
  id: string
  tag?: TextTagProps
}
export type TextTemplateProps = Partial<TextComponentProps> & RequiredComponentProps
export type ImageTemplateProps = Partial<ImageComponentProps> & RequiredComponentProps
