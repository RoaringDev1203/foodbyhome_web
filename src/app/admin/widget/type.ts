import { IconType } from 'react-icons'

export type IconWidgetCard = {
  text: string
  amount?: number
  price?: number
  icon: IconType
  variant1: string
  variant2: string
}
export type ValueWidgetCard = {
  text: string
  amount?: number
  price?: number
  color: string
  width: number
  subText: string
}

export type ChartWidgetCard = {
  text: string
  amount?: number
  price?: number
  color: string
  chartColor: string
  percentage: number
}

export type ChartWidgetCard2 = {
  text: string
  amount?: string
  price?: string
  chartColor: string
}

export type TeamWidgetCard = {
  img: string
  name: string
  post: string
}

export type TeamWidgetCard2 = {
  img: string
  time: string
  name: string
  text: string
  class?: string
}

export type TeamWidgetCard3 = {
  time: string
  event: string
}

export type TeamWidgetCard4 = {
  text: string
  amount: string
  icon: IconType
}

export type TeamWidgetCard5 = {
  text1: string
  text2: string
}

export type TeamWidgetCard6 = {
  class?: string
  img?: string
  avatar?: string
  name: string
  text: string
  text2?: string
  icon?: IconType
  variant?: string
  min: string
}
