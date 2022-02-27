export interface IResponse {
  result: object | string | boolean | any;
  targetUrl: string;
  success: boolean;
  error: object | string;
  unAuthRequest: boolean;
  __abp: boolean;
}
