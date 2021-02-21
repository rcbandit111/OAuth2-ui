import { TestBed, inject } from '@angular/core/testing';

import { DefaultRouteService } from './default-route.service';

describe('DefaultRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultRouteService]
    });
  });

  it('should be created', inject([DefaultRouteService], (service: DefaultRouteService) => {
    expect(service).toBeTruthy();
  }));
});
