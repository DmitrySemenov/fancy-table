import { SortOrder } from '../core/collections';
import { IFancyColumn } from './shared/fancy-column';
import { FancyData } from './shared/fancy-data';

const fancyColumn: IFancyColumn[] = [
  {
    displayName: 'First Name',
    fieldName: 'firstName',
    typeName: 'string',
  },
  {
    displayName: 'Last Name',
    fieldName: 'lastName',
    typeName: 'string',
  },
  {
    displayName: 'ID',
    fieldName: 'id',
    typeName: 'string',
  },
  {
    displayName: 'Active',
    fieldName: 'isActive',
    typeName: 'boolean',
  },
  {
    displayName: 'Balance',
    fieldName: 'balance',
    typeName: 'string',
  },
  {
    displayName: 'Picture',
    fieldName: 'picture',
    typeName: 'image',
  },
  {
    displayName: 'Age',
    fieldName: 'age',
    typeName: 'number',
  },
  {
    displayName: 'Company',
    fieldName: 'company',
    typeName: 'string',
  },
  {
    displayName: 'Email',
    fieldName: 'email',
    typeName: 'email',
  },
  {
    displayName: 'Address',
    fieldName: 'address',
    typeName: 'string',
  },
  {
    displayName: 'Tags',
    fieldName: 'tags',
    typeName: 'array',
  },
  {
    displayName: 'Favorite Fruit',
    fieldName: 'favoriteFruit',
    typeName: 'string',
  },
];

export const fancyConfig = {
  api: {
    fancyApi: 'https://raw.githubusercontent.com/wb3r/testproject/main/src/assets/database.ts', // TODO: move to env.
  },
  containers: {
    filter: {
      searchableFields: ['firstName', 'lastName', 'age', 'company', 'email', 'address', 'tags', 'favoriteFruit'] as FieldsOf<FancyData>,
    },
    list: {
      defaultSortOrder: {
        fieldName: 'firstName' as FieldOf<FancyData>,
        sortOrder: SortOrder.asc,
      },
      minRefreshTimeout: 1000,
    },
    refreshInterval: 60 * 1000,
  },
  fancyColumns: fancyColumn,
};
