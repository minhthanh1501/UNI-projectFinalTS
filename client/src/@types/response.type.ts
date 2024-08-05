export interface ApiResponse {
  status: boolean;
  message: string;
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
