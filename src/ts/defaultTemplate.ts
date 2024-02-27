import { TextComponentProps, TextTagProps } from './defaultProps'

interface RequiredTextComponentProps {
  id: string
  tag: TextTagProps
}
export type TextTemplateProps = Partial<TextComponentProps> & RequiredTextComponentProps
