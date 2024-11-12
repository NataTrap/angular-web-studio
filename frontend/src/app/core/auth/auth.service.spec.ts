import {TestBed} from "@angular/core/testing";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";

describe('auth service', () => {

  let authService: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {

    httpServiceSpy = jasmine.createSpyObj('HttpClient', ['get', 'post'])

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: HttpClient, useValue: httpServiceSpy}
      ]
    });

    authService = TestBed.inject(AuthService);

  });

  it('should emit true value for isLogged$', (done: DoneFn) => {

    authService.isLogged$.subscribe((data: boolean) => {
      expect(data).toBe(true);
      done();
    });

    authService.setTokens('hhh', 'jjj');
  });

  it('should emit false value for isLogged$', (done: DoneFn) => {

    authService.isLogged$.subscribe((data: boolean) => {
      expect(data).toBe(false);
      done();
    });

    authService.removeTokens();
  });


});
