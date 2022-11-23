import { BrandsModel } from './../../models/BrandsModel';
import { CarListService } from './../../services/car-list.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ColorsService } from 'src/app/services/colors.service';
import { BrandsService } from 'src/app/services/brands.service';
import { ColorsModel } from './../../models/ColorsModel';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm!: FormGroup;
  carBrands: BrandsModel[] = [];
  carColors: ColorsModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private carListService: CarListService,
    private brandsService: BrandsService,
    private colorService: ColorsService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getCarsBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.max(4)]],
      color: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      state: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required],
    });
  }
  add() {
    console.log(this.carAddForm.value);
    if (this.carAddForm.value) {
      let carInputDatas = Object.assign({}, this.carAddForm.value);
      this.carListService.add(carInputDatas).subscribe((response) => {
        console.log(response);
      });
    }
  }
  getCarsBrands() {
    this.brandsService.getBrands().subscribe((response) => {
      console.log(response);
      this.carBrands = response;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.carColors = response;
    });
  }
}
