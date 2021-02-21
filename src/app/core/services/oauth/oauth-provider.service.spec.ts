import { TestBed, inject } from '@angular/core/testing';

import { OauthProviderService } from './oauth-provider.service';

describe('OauthProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OauthProviderService]
    });
  });

  it('should be created', inject([OauthProviderService], (service: OauthProviderService) => {
    expect(service).toBeTruthy();
  }));
});
