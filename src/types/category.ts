export declare interface Icat1 {
  text?: string
  value?: string
  type?: string
  sub?: Icat2
}

export declare interface Icat2 {
  text: string
  value: string
  type?: string
  sub2?: Icat3,
  isTagOpen?: boolean
}

export declare interface Icat3 {
  text: string
  value: string
}