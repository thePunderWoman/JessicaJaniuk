export class Post {
  public Title: string;
  public Content: string;
  public Category: string;
  public Tags: string[] = [];
  public Published: boolean = false;
  public PublishDate: Date = null;

  constructor() {}

}
