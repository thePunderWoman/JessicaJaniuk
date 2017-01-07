import * as moment from 'moment';

export class Post {
  public Title: string;
  public Content: string;
  public Category: string;
  public Tags: string[] = [];
  public Published: boolean = false;
  public PublishDate: string = moment().format();

  constructor() {}

  get PublishDateString(): string {
    let date = new Date(this.PublishDate);
    return moment(date).format('M-D-YYYY h:mm a');
  }

  set PublishDateString(value) {
    this.PublishDate = moment(value, 'M-D-YYYY h:mm a').format();
  }
}
