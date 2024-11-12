import {LoaderService} from "./loader.service";

describe('loader service', () => {

  let loaderService: LoaderService;
  beforeEach(() => {
    loaderService = new LoaderService();
  });

  it('should emit true value for showing loader', (done: DoneFn) => {
    loaderService.isShowed.subscribe((isShowed: boolean) => {
      expect(isShowed).toBe(true);
      done();
    });

    loaderService.show();
  });

  it('should emit false value for hiding loader', (done: DoneFn) => {
    loaderService.isShowed.subscribe((isShowed: boolean) => {
      expect(isShowed).toBe(false);
      done();
    });

    loaderService.hide();
  });

});
