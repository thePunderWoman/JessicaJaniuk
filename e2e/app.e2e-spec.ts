import { JessicaJaniukPage } from './app.po';

describe('jessica-janiuk App', function() {
  let page: JessicaJaniukPage;

  beforeEach(() => {
    page = new JessicaJaniukPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
