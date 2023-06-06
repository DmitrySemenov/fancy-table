export class ErrorResponse {
  status: number;
  code: number;
  error: string;
  message: string;
  details: string[];

  constructor({ status, code, error, message, details }: Partial<ErrorResponse> = {}) {
    this.status = status || 0;
    this.code = code || 0;
    this.error = error || '';
    this.message = message || '';
    this.details = details || [];
  }
}
