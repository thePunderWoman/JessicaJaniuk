import * as moment from 'moment';

export class Post {
  public id: number;
  public title: string;
  public key: string;
  public content: string;
  public categoryId: number;
  public tags: string[] = [];
  public published = false;
  public publishDate: Date = new Date();

  constructor(post = undefined) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.key = post.key;
      this.content = post.content;
      this.categoryId = post.categoryId;
      this.tags = post.tags;
      this.published = post.published;
      this.publishDate = moment(post.publishDate).toDate();
    }
  }

  get PublishDateString(): string {
    return moment(this.publishDate).format('M-D-YYYY h:mm a');
  }

  set PublishDateString(value) {
    this.publishDate = moment(value, 'M-D-YYYY h:mm a').toDate();
  }

  get month(): number {
    return this.publishDate.getMonth() + 1;
  }

  get day(): number {
    return this.publishDate.getDate();
  }

  get year(): number {
    return this.publishDate.getFullYear();
  }
}
