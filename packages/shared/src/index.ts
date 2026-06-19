export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

export interface ApiResponse<T> {
  data: T;
  success: true;
}

export interface ApiErrorResponse {
  error: ApiError;
  success: false;
}
