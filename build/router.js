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
 * @LastEditTime: 2021-07-26 08:31:37
 */
var express_1 = require("express");
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var crowller_1 = __importDefault(require("./crowller"));
var router = express_1.Router();
router.get('/', function (request, response) {
    response.send("\n    <html>\n    <body>\n      <form method=\"post\" action=\"/getData\">\n        <input type=\"password\" name=\"password\" />\n        <button>\u63D0\u4EA4</button>\n        </form>\n    </body>\n    </html>\n  ");
});
router.post('/getData', function (request, response) {
    var password = request.body.password;
    if (password === '123') {
        var secret = 'secretKey';
        var url = 'http://www.dell-lee.com/';
        var analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        response.send('getData success!!!');
    }
    else {
        response.send('password Error!!!');
    }
});
exports.default = router;
