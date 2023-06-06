import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../core/api';
import { FancyData, FancyDataRaw } from './shared/fancy-data';
import { fancyConfig } from './fancy.config';
import * as data from '../../assets/data/data';
import map from 'lodash-es/map';

@Injectable({
  providedIn: 'root',
})
export class FancyApiService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  async getFancyData(): Promise<FancyData[]> {
    let url = fancyConfig.api.fancyApi;
    const noCacheUrl = this.apiService.setNoCacheQueryParam(url);
    let response: FancyDataRaw[];
    try {
      // This code is written for testing the table

      // - get date from server
      //   response = await firstValueFrom(this.http.get(noCacheUrl, { responseType: 'text' }));

      // - emulate server error
      //   throw new Error('some error');

      // - delay for tests
      await this.delay(2000);
      response = data.default;
    } catch (error: any) {
      const errorResponse = this.apiService.handleError(error);
      throw errorResponse;
    }

    const fancyData = this.mapFancyDataResponse(response);
    return fancyData;
  }

  private mapFancyDataResponse(response: FancyDataRaw[]): FancyData[] {
    const fancyData = map<FancyDataRaw, FancyData>(response, (fancyResponse: FancyDataRaw) => this.mapFancyDataRaw(fancyResponse));
    return fancyData;
  }

  private mapFancyDataRaw(raw: FancyDataRaw): FancyData {
    return new FancyData({
      id: raw._id,
      isActive: raw.isActive,
      balance: raw.balance,
      picture: raw.picture,
      age: raw.age,
      firstName: raw.name?.first,
      lastName: raw.name?.last,
      company: raw.company,
      email: raw.email,
      address: raw.address,
      tags: raw.tags,
      favoriteFruit: raw.favoriteFruit,
    });
  }

  private delay(timeout: number): Promise<void> {
    const promise = new Promise<void>((resolve: Function) => setTimeout(() => resolve(), timeout));

    return promise;
  }
}
