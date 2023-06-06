import { Injectable } from '@angular/core';
import { filter, isNumber, map, toString, isObject, isArray, every, get, isEmpty, has, keys } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly separator = ' ';

  filter<T extends object>(items: T[], search: string, searchableFields?: FieldsOf<T>, fieldsMappers?: PropertyMapper<T, string>): T[] {
    if (!search) {
      return items;
    }

    const filteredItems = filter(items, (item: T) => this.filterItem(item, search, searchableFields, fieldsMappers));
    return filteredItems;
  }

  private filterItem<T extends object>(
    item: T,
    search: string,
    searchableFields?: FieldsOf<T>,
    fieldsMappers?: PropertyMapper<T, string>
  ): boolean {
    searchableFields = isEmpty(searchableFields) ? (keys(item) as FieldsOf<T>) : searchableFields;

    const searchableValues: string[] = map<any, string>(searchableFields, (field: keyof T): string =>
      this.mapItemFieldToString(item, field, fieldsMappers).toLowerCase()
    );

    const searchableText = searchableValues.join(this.separator);
    const searchParts = search.toLowerCase().split(this.separator);
    const isMatched = every(searchParts, (searchPart: string) => searchableText.indexOf(searchPart) !== -1);

    return isMatched;
  }

  private mapItemFieldToString<T extends object>(
    item: T,
    field: string | number | symbol,
    fieldsMappers?: PropertyMapper<T, string>
  ): string {
    const value = get(item, field);

    let result: string;
    if (fieldsMappers && has(fieldsMappers, field)) {
      const fieldMapper: Mapper<any, string> = get(fieldsMappers, field);
      result = fieldMapper(value);
    } else if (isArray(value) || !isObject(value)) {
      if (isNumber(value)) {
        result = value.toFixed().toString();
      } else {
        result = toString(value);
      }
    } else {
      result = '';
    }

    return result;
  }
}
