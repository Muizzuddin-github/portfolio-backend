export interface ResponseMsg {
  message: string;
}

export interface ResponseErrors {
  errors: string[];
}

export interface ResponseData<T> {
  message: string;
  data: T[];
}
