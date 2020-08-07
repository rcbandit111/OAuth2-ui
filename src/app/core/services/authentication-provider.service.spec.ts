import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationProviderService } from './authentication-provider.service';

describe('AuthenticationProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationProviderService]
    });
  });

  it('should be created', inject([AuthenticationProviderService], (service: AuthenticationProviderService) => {
    expect(service).toBeTruthy();
  }));
});
