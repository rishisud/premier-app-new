import { TestBed } from '@angular/core/testing';

import { DeviceInterrogationService } from './device-interrogation.service';

describe('DeviceInterrogationService', () => {
  let service: DeviceInterrogationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceInterrogationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
