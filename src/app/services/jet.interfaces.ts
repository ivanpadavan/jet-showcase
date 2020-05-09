import { makeEnum } from '../shared/utils/make-enum';

export const FieldTypes = makeEnum(
  'CharField',
  'BooleanField',
  'IntegerField',
  'FloatField',
  'DateTimeField',
  'TimeStampField',
  'ForeignKey',
  'JSONField',
  'GeometryField',
  'GeographyField',
);
export type FieldType = keyof typeof FieldTypes;

export interface Params {
  empty: true;
}

export interface Field {
  name: string;
  db_column: string;
  field: FieldType;
  filterable: boolean;
  null: boolean;
  editable: boolean;
  params: Params;
}

export interface ModelDescription {
  model: string;
  db_table: string;
  hidden: boolean;
  primary_key_field: string;
  fields: Field[];
}

