/*
 * @Descripttion:
 * @version:
 * @Author: tjwang
 * @Date: 2021-07-28 08:57:17
 * @LastEditors: tjwang
 * @LastEditTime: 2021-07-30 08:28:41
 */
interface Result {
  success: Boolean;
  errMsg?: String;
  data: any;
}

export const getResponseData = (data:any,errMsg?:string): Result => {
  if(errMsg) {
    return {
      success: false,
      errMsg,
      data
    }
  }
  return {
    success: true,
    data
  }
}