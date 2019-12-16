import { FilterUserByLastAndFirstNamePipe } from './filter-user-by-last-and-first-name.pipe';

describe('FilterUserByLastAndFirstNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterUserByLastAndFirstNamePipe();
    expect(pipe).toBeTruthy();
  });
});
