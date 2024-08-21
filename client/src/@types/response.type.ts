export interface ApiResponse {
  status: boolean;
  mes: string;
}

export interface ApiGroupResponse<T> extends ApiResponse {
  groupData: T;
}

export interface ApiUserResponse<T> extends ApiResponse {
  userData: T;
}

export interface ApiMenuResponse<T> extends ApiResponse {
  menuData: T;
}

export interface ApiProfessionResponse<T> extends ApiResponse {
  professionData: T;
}

export interface ApiFacilityTypeResponse<T> extends ApiResponse {
  facilityTypeData: T;
}

export interface ApiContentTestResponse<T> extends ApiResponse {
  contentTestData: T;
}

export interface ApiProductResponse<T> extends ApiResponse {
  productData: T;
}
