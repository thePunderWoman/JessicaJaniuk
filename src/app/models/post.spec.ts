import { Post } from './post';
import * as moment from 'moment';

describe('Post model', () => {
  it('should get and set published date string', () => {
    const date = new Date(2017, 0, 11, 14, 23);
    const datestr = moment(date).format('M-D-YYYY h:mm a');
    const post = new Post();
    post.PublishDateString = datestr;
    expect(post.publishDate).toEqual(date);
    expect(post.PublishDateString).toBe(datestr);
  });
});
