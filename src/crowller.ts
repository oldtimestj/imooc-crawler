import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import DellAnalyzer from './dellAnalyzer';
export interface Analyzer {
  analyze:(html:string, filePath:string) => string;
}
class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json');
  constructor(private url:string,private analyzer:Analyzer) {
    this.initSpiderProcess()
  }
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text || '';
  }
  
  private writeFile(content:string) {
    fs.writeFileSync(this.filePath, content);
  }
}
const secret = 'secretKey'; 
const url = 'http://www.dell-lee.com/';

const analyzer = DellAnalyzer.getInstance();
new Crowller(url, analyzer);