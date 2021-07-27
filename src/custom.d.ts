/*
 * @Descripttion: 
 * @version: 
 * @Author: tjwang
 * @Date: 2021-07-26 08:46:53
 * @LastEditors: tjwang
 * @LastEditTime: 2021-07-26 08:48:44
 */
declare namespace Express {
  interface Request {
    teacherName: string;
    teacherNum: number;
  }
}