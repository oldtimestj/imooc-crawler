/*
 * @Descripttion: 
 * @version: 
 * @Author: tjwang
 * @Date: 2021-07-22 08:42:59
 * @LastEditors: tjwang
 * @LastEditTime: 2021-07-26 08:48:26
 */
import express,  { Request, Response, NextFunction } from 'express';
import router from './router';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use((request: Request, response:Response, next: NextFunction ) => {
  request.teacherName = 'dell';
  request.teacherNum = 123;
  next();
})
app.use(router);
app.listen(7001, () => {
  console.log('server is running');
})