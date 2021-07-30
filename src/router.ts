/*
 * @Descripttion: 
 * @version: 
 * @Author: tjwang
 * @Date: 2021-07-23 08:30:01
 * @LastEditors: tjwang
 * @LastEditTime: 2021-07-30 08:43:31
 */
import { Router, Request, Response, request, NextFunction } from "express";
import fs from 'fs';
import path from 'path';
import Analyzer from './utils/analyzer';
import Crowller from './utils/crowller';
import { getResponseData } from './utils/util';
interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  }
}
const checkLogin = (request: Request, response: Response, next: NextFunction) => {
  const isLogin = request.session ? request.session.login : undefined;
  if(isLogin) {
    next();
  }else {
   response.json(getResponseData(null, '请先登录'));
  }
}

const router = Router();
router.get('/', (request: Request, response: Response) => {
  const isLogin = request.session ? request.session.login : undefined;
  if(isLogin) {
    response.send(`
      <html>
      <body>
        <a href='/getData'>爬取内容</a>
        <a href='/showData'>展示内容</a>
        <a href='/logout'>退出</a>
      </body>
      </html>
    `);
  }else {
    response.send(`
      <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>登录</button>
        </form>
      </body>
      </html>
    `);
  }
})
router.get('/logout', (request: Request, response: Response) => {
  if(request.session) {
    request.session.login = undefined;
  }
  response.json(getResponseData(true));
})

router.post('/login', (request: BodyRequest, response: Response) => {
  const { password } = request.body;
  const isLogin = request.session ? request.session.login : undefined;
  if(isLogin) {
    response.json(getResponseData(false, '已经登录成功'));
  } else {
    if (password === '123' && request.session) {
      request.session.login = true;
      response.json(getResponseData(true));
    }else {
      response.json(getResponseData(false,'登录失败'));
    }
  }
})
router.get('/getData', checkLogin, (request: BodyRequest, response: Response) => {
    const secret = 'secretKey';
    const url = 'http://www.dell-lee.com/typescript/demo.html';
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    response.json(getResponseData(true));
})
router.get('/showData', checkLogin, (request: BodyRequest, response: Response) => {
    try {
      const position = path.resolve(__dirname, '../data/course.json');
      const resultData = fs.readFileSync(position, 'utf-8');
      response.json(getResponseData(JSON.parse(resultData)));
    } catch (e) {
      response.json(getResponseData(false,'数据不存在'));
    }
})

export default router;