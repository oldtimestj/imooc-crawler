"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: tjwang
 * @Date: 2021-07-23 08:30:01
 * @LastEditors: tjwang
 * @LastEditTime: 2021-07-30 08:43:31
 */
var express_1 = require("express");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var crowller_1 = __importDefault(require("./utils/crowller"));
var util_1 = require("./utils/util");
var checkLogin = function (request, response, next) {
    var isLogin = request.session ? request.session.login : undefined;
    if (isLogin) {
        next();
    }
    else {
        response.json(util_1.getResponseData(null, '请先登录'));
    }
};
var router = express_1.Router();
router.get('/', function (request, response) {
    var isLogin = request.session ? request.session.login : undefined;
    if (isLogin) {
        response.send("\n      <html>\n      <body>\n        <a href='/getData'>\u722C\u53D6\u5185\u5BB9</a>\n        <a href='/showData'>\u5C55\u793A\u5185\u5BB9</a>\n        <a href='/logout'>\u9000\u51FA</a>\n      </body>\n      </html>\n    ");
    }
    else {
        response.send("\n      <html>\n      <body>\n        <form method=\"post\" action=\"/login\">\n          <input type=\"password\" name=\"password\" />\n          <button>\u767B\u5F55</button>\n        </form>\n      </body>\n      </html>\n    ");
    }
});
router.get('/logout', function (request, response) {
    if (request.session) {
        request.session.login = undefined;
    }
    response.json(util_1.getResponseData(true));
});
router.post('/login', function (request, response) {
    var password = request.body.password;
    var isLogin = request.session ? request.session.login : undefined;
    if (isLogin) {
        response.json(util_1.getResponseData(false, '已经登录成功'));
    }
    else {
        if (password === '123' && request.session) {
            request.session.login = true;
            response.json(util_1.getResponseData(true));
        }
        else {
            response.json(util_1.getResponseData(false, '登录失败'));
        }
    }
});
router.get('/getData', checkLogin, function (request, response) {
    var secret = 'secretKey';
    var url = 'http://www.dell-lee.com/typescript/demo.html';
    var analyzer = analyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    response.json(util_1.getResponseData(true));
});
router.get('/showData', checkLogin, function (request, response) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/course.json');
        var resultData = fs_1.default.readFileSync(position, 'utf-8');
        response.json(util_1.getResponseData(JSON.parse(resultData)));
    }
    catch (e) {
        response.json(util_1.getResponseData(false, '数据不存在'));
    }
});
exports.default = router;
