/*
 * @Descripttion: 
 * @version: 
 * @Author: tjwang
 * @Date: 2021-07-22 08:42:59
 * @LastEditors: tjwang
 * @LastEditTime: 2021-07-28 08:43:42
 */
import express from 'express';
import cookieSession from 'cookie-session';
import router from './router';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  name: 'session',
  keys: ['teacher dell'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(router);
app.listen(7001, () => {
  console.log('server is running');
})