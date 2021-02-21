import {HttpParams} from "@angular/common/http";

export class HttpUtils {

  static appendPageParams(filter: HttpParams, page: number, size: number): HttpParams {
    return filter.append('page', (page - 1).toString())
      .append('size', size.toString());
  }
}
