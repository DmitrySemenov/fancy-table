import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash-es';

@Pipe({
  name: 'isEmpty',
})
export class IsEmptyPipe implements PipeTransform {
  transform(value: any): boolean {
    const isEmptyValue = isEmpty(value);

    return isEmptyValue;
  }
}
