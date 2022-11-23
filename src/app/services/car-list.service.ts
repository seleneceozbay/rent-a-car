import { ColorsModel } from './../models/ColorsModel';
import { BrandsModel } from './../models/BrandsModel';
import { CarListModel } from './../models/CarListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarListService {
  apiUrl = 'http://localhost:3000/car-list';
  queryPath: string = '';
  selectedBrand: BrandsModel;
  selectedColor: ColorsModel;

  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<CarListModel[]> {
    return this.httpClient.get<CarListModel[]>(this.createApiUrl());
  }
  getCarList(state: number): Observable<CarListModel[]> {
    return this.httpClient.get<CarListModel[]>(this.apiUrl + '?state=' + state);
  }
  getCarsByColorId(id: number): Observable<CarListModel[]> {
    return this.httpClient.get<CarListModel[]>(
      this.apiUrl + '?colorId=' + id + '&state=1'
    );
  }
  getCarsByBrandId(id: number): Observable<CarListModel[]> {
    return this.httpClient.get<CarListModel[]>(
      this.apiUrl + '?brandId=' + id + '&state=1'
    );
  }
  getCarDetail(id: number): Observable<CarListModel[]> {
    return this.httpClient.get<CarListModel[]>(this.apiUrl + '?q&id=' + id);
  }
  add(data: CarListModel): Observable<CarListModel> {
    return this.httpClient.post<CarListModel>(this.apiUrl, data);
  }
  update(id: any, data: CarListModel): Observable<CarListModel> {
    return this.httpClient.put<CarListModel>(this.apiUrl + '/' + id, data);
  }
  delete(data: any): Observable<CarListModel> {
    return this.httpClient.delete<CarListModel>(this.apiUrl + '/' + data.id);
  }
  setSelectedBrand(brand) {
    this.selectedBrand = brand;
  }
  setSelectedColor(color) {
    this.selectedColor = color;
  }
  createApiUrl() {
    if (this.selectedBrand) {
      this.queryPath = this.apiUrl + '?brandId=' + this.selectedBrand.id;
    }
    if (this.selectedColor) {
      this.queryPath = this.apiUrl + '?colorId=' + this.selectedColor.id;
    }
    if (this.selectedBrand && this.selectedColor) {
      this.queryPath =
        this.apiUrl +
        '?brandId=' +
        this.selectedBrand.id +
        '&colorId=' +
        this.selectedColor.id;
    }
    if (!this.selectedBrand && !this.selectedColor) {
      this.queryPath = this.apiUrl;
    }
    return this.queryPath;
  }
}
