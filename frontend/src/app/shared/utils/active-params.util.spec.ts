import {ActiveParamsUtil} from "./active-params.util";

describe('active params util', () => {

  it('should change type string to type array', () => {
    const result = ActiveParamsUtil.processParams({
      categories: 'smm'
    });

    expect(result.categories).toBeInstanceOf(Array);
  });

  it('should change page string to int', () => {
    const result = ActiveParamsUtil.processParams({
      page: '2'
    });

    expect(result.page).toBe(2);
  });

  it('should change page string to int', () => {
    const result: any = ActiveParamsUtil.processParams({
      pages: '2'
    });

    expect(result.pages).toBeUndefined();
  });

});
