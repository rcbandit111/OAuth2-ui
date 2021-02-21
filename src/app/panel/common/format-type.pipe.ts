import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name: 'formatType'})
export class FormatTypePipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
  }

}
