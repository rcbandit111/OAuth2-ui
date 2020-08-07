import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  volumes(currency: string = 'EUR'): Observable<any[]> {
    return this.http.get<any[]>(environment.api.urls.dashboard.get(currency))
      .pipe(map((volumes) => volumes.sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        if (d1 > d2) {
          return 1;
        } else if (d1 < d2) {
          return -1;
        }
        return 0;
      })));
  }

}
