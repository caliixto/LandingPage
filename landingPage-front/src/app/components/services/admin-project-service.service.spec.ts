import { TestBed } from '@angular/core/testing';

import { AdminProjectServiceService } from './admin-project-service.service';

describe('AdminProjectServiceService', () => {
  let service: AdminProjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProjectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
