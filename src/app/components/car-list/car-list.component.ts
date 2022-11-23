import { CarListModel } from './../../models/CarListModel';
import { ActivatedRoute } from '@angular/router';
import { CarListService } from './../../services/car-list.service';
import { Component, OnInit } from '@angular/core';
import { CarFilterPipe } from 'src/app/pipes/cars-filter.pipe';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  carlists: CarListModel[] = [];
  carFilterText: string = '';

  constructor(
    private carListService: CarListService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCars();
    });
  }
  getCars() {
    this.carListService.getCars().subscribe((data) => (this.carlists = data));
  }
  getCarList(state: number) {
    this.carListService.getCarList(state).subscribe((data) => {
      this.carlists = data;
    });
  }
  getCarsByColorId(id: number) {
    this.carListService
      .getCarsByColorId(id)
      .subscribe((data) => (this.carlists = data));
  }
  getCarsByBrandId(id: number) {
    this.carListService
      .getCarsByBrandId(id)
      .subscribe((data) => (this.carlists = data));
  }
  clickDetail(data: any) {
    console.log(data);
  }
  delete(data: any) {
    this.carlists = this.carlists.filter((x) => x !== data);
    this.carListService.delete(data).subscribe();
  }
}
