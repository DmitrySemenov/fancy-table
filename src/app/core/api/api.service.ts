import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from './error-response';
import { StatusCode } from './status-code';
import { coreConfig } from '../core.config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  handleError(error: HttpErrorResponse): ErrorResponse {
    let result: ErrorResponse;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      result = new ErrorResponse({
        status: StatusCode.Unknown,
        message: error.error.message,
      });
    } else {
      // The backend returned an unsuccessful response code.
      const serverError: any = error.error || {};
      result = this.mapErrorResponse(serverError, error.status);
    }

    return result;
  }

  mapErrorResponse(response: any, status: number = StatusCode.Unknown): ErrorResponse {
    let error: ErrorResponse;
    if (!response) {
      error = new ErrorResponse({ status: status });
    } else {
      error = new ErrorResponse({
        status: status,
        code: response.code,
        error: response.error,
        message: response.message,
        details: response.details,
      });
    }

    return error;
  }

  setNoCacheQueryParam(url: string, noCacheValue: string = new Date().getTime().toString()): string {
    const separator = url.indexOf('?') === -1 ? '?' : '&';

    const urlWithNoCacheQueryParam = `${url}${separator}${coreConfig.api.params.noCache}=${encodeURI(noCacheValue)}`;

    return urlWithNoCacheQueryParam;
  }
}
