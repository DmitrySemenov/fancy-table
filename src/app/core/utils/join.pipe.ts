import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isArray } from 'lodash-es';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(values: any, separator?: string): string {
    if (isEmpty(values) || !isArray(values)) {
      return '';
    }

    const joinedValues = values.join(separator);

    return joinedValues;
  }
}
