import { TestBed } from '@angular/core/testing';

import { ReportGetServiceService } from './report-get-service.service';

describe('ReportGetServiceService', () => {
  let service: ReportGetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportGetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
