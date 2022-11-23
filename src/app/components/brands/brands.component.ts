import { BrandsModel } from './../../models/BrandsModel';
import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarListService } from 'src/app/services/car-list.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: BrandsModel[] = [];
  brandname!: string;
  brandFilterText: string = '';
  constructor(
    private brandsService: BrandsService,
    private activatedRoute: ActivatedRoute,
    private carListService: CarListService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandsService.getBrands().subscribe((data) => (this.brands = data));
  }
  selectBrands(brand: any) {
    this.brandname = brand.name;
    this.carListService.setSelectedBrand(brand);
  }
}
