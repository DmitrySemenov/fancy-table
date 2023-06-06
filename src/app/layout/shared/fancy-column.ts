import { FancyData } from './fancy-data';

export interface IFancyColumn {
  displayName: string;
  fieldName: FieldOf<FancyData>;
  typeName: FancyColumnType;
}

export class SelectableFancyColumn implements IFancyColumn {
  displayName: string;
  fieldName: keyof FancyData;
  typeName: FancyColumnType;
  isSelected: boolean;

  constructor({ displayName, fieldName, typeName, isSelected }: SelectableFancyColumn) {
    this.displayName = displayName;
    this.fieldName = fieldName;
    this.typeName = typeName;
    this.isSelected = isSelected || false;
  }
}

export type FancyColumnType = 'string' | 'boolean' | 'number' | 'array' | 'image' | 'email';
