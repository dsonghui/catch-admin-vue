export interface ResponseSuccess<T> {
  code: number;
  message: string;
  data: T;
}
