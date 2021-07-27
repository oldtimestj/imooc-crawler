/*
 * @Descripttion: 
 * @version: 
 * @Author: tjwang
 * @Date: 2021-07-23 08:30:01
 * @LastEditors: tjwang
 * @LastEditTime: 2021-07-26 08:55:31
 */
import { Router, Request, Response } from "express";
import DellAnalyzer from './dellAnalyzer';
import Crowller from './crowller';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  }
}
const router = Router();
router.get('/', (request: Request, response: Response) => {
  response.send(`
    <html>
    <body>
      <form method="post" action="/getData">
        <input type="password" name="password" />
        <button>提交</button>
        </form>
    </body>
    </html>
  `);
})

router.post('/getData', (request: RequestWithBody, response: Response) => {
  const { password } = request.body;
  if(password === '123') {
    const secret = 'secretKey'; 
    const url = 'http://www.dell-lee.com/';
    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);
    response.send('getData success!!!');
  }else {
    response.send(`${request.teacherName}password Error!!!`)
  }

})
export default router;