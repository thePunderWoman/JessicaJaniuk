import * as moment from 'moment';

export class Post {
  public id: number;
  public title: string;
  public content: string;
  public categoryId: number;
  public Tags: string[] = [];
  public published: boolean = false;
  public publishDate: Date = new Date();

  constructor() {}

  get PublishDateString(): string {
    return moment(this.publishDate).format('M-D-YYYY h:mm a');
  }

  set PublishDateString(value) {
    this.publishDate = moment(value, 'M-D-YYYY h:mm a').toDate();
  }
}
