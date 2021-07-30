import cheerio from 'cheerio';
import fs from 'fs';
import {Analyzer} from './crowller';
interface course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: course[];
}
interface Content {
  [propName: number]: course[];
}
export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer;
  private constructor() {};
  static getInstance() {
    if(!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }
  private getCourseInfo(html:string) {
    const $ = cheerio.load(html);
    const courseItem = $('.course-item');
    const courseInfos: course[] = [];
    courseItem.map((index, element) => {
      const desc = $(element).find('.course-desc');
      const title = desc.eq(0).text();
      courseInfos.push({
        title,
        count: index
      })
    })
    return {
      time: (new Date()).getTime(),
      data: courseInfos
    }
  }
  private generateJsonContent(result: CourseResult,filePath:string) {
    let fileContent: Content = {};
    if(fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[result.time] = result.data;
    return fileContent;
  }
  public analyze(html:string, filePath:string) {
    const courseInfo =  this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}