import * as moment from 'moment';
import { MetaTag } from './MetaTag';

export class Post {
  public id: number;
  public title: string;
  public key: string;
  public content: string;
  public categoryId: number;
  public tags: string[] = [];
  public meta: MetaTag[] = [];
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
      this.meta = post.meta;
    }
  }

  get PublishDateString(): string {
    return moment(this.publishDate).format('M-D-YYYY h:mm a');
  }

  set PublishDateString(value) {
    this.publishDate = moment(value, 'M-D-YYYY h:mm a').toDate();
  }

  get month(): number {
    return this.publishDate.getUTCMonth() + 1;
  }

  get day(): number {
    return this.publishDate.getUTCDate();
  }

  get year(): number {
    return this.publishDate.getUTCFullYear();
  }
}
