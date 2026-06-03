import { TestBed } from '@angular/core/testing';

import { LoginFormServicesService } from './login-form-services.service';

describe('LoginFormServicesService', () => {
  let service: LoginFormServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFormServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
