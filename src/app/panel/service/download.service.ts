import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {
  }

  downloadPDF(): any {
    return this.http.get(environment.api.urls.downloads.getPdf, {
      responseType: 'blob'
    })
      .pipe(
        map((res: any) => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }
}
