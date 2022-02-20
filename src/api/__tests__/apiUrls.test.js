import * as urls from '../apiUrls';

describe('urls', () => {
  it('remains unchanged', () => {
    expect(urls).toMatchSnapshot();
  });
});
