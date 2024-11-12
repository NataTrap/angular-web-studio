export type RequestType = {
  name: string,
  phone: string,
  service?: string,
  type: RequestEnum.order | RequestEnum.consultation
}

export enum RequestEnum {
  order = 'order',
  consultation = 'consultation'
}
