import { Post } from './post';
import * as moment from 'moment';

fdescribe('Post model', () => {
  it('should get and set published date string', () => {
    let date = new Date(2017, 0, 11, 14, 23);
    let datestr = moment(date).format('M-D-YYYY h:mm a');
    let post = new Post();
    post.PublishDateString = datestr;
    expect(post.PublishDate).toBe(moment(date).format());
    expect(post.PublishDateString).toBe(datestr);
  });
});
