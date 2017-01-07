import { Post } from './post';
import * as moment from 'moment';

describe('Post model', () => {
  it('should get and set published date string', () => {
    let post = new Post();
    post.PublishDateString = '1-11-2017 2:23 pm';
    expect(post.PublishDate).toBe('2017-01-11T14:23:00-05:00');
    expect(post.PublishDateString).toBe('1-11-2017 2:23 pm');
  });
});
