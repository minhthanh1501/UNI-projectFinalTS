export interface FacilityType {
  _id: string;
  code: string;
  name: string;
  type: string;
  field: string;
  note: string;
}

export type FacilityTypes = FacilityType[];

export interface ParamsProps {
  name?: string;
  field?: string;
}

export interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  type: string;
  field: string;
}
