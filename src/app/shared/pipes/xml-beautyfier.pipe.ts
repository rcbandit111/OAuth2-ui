import { Pipe, PipeTransform } from '@angular/core';
import * as beautify from 'vkbeautify';
@Pipe({
  name: 'xmlBeautyfier'
})
export class XmlBeautyfierPipe implements PipeTransform {

  transform(value: string): string {
    return beautify.xml(value);
  }

}
