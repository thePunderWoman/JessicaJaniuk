import { MetaTag } from './MetaTag';

export class Page {
  public id: number;

  constructor(public title: string,
              public key: string,
              public content: string,
              public meta: MetaTag[]) {}

}
