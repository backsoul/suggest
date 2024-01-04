import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  public products: any = [];
  public product: any;

  public nameProduct: any;
  constructor(
    public httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log();
    this.getData();
  }
  getData(name = '') {
    this.product = {};
    if (name) {
      this.nameProduct = name;
    } else {
      this.nameProduct = this.route.snapshot.params['name'].replace(' ', '%20');
    }
    this.httpClient
      .get(
        'https://backend-suggest-fb44ddff80b0.herokuapp.com/product/' +
          this.nameProduct
      )
      .subscribe((res: any) => {
        this.ngZone.run(() => {
          this.product = res;
          console.log(this.product);
        });
      });
    this.httpClient
      .get(
        'https://backend-suggest-fb44ddff80b0.herokuapp.com/recomendar/' +
          this.nameProduct
      )
      .subscribe((res: any) => {
        this.ngZone.run(() => {
          this.products = res.sort(function (a: any, b: any) {
            return parseFloat(b.similarity) - parseFloat(a.similarity);
          });

          this.products = this.products.filter((a: any) => a.similarity != 1);
        });
      });
  }
  get getProduct() {
    return this.product;
  }
  goToDetail(name: string) {
    this.router.navigateByUrl(name);
    this.getData(name);
  }

  goToHome() {
    this.router.navigate(['']);
  }
  changeBackground(): any {
    if (this.product) {
      return { background: 'url(' + this.product.image + ')' };
    } else {
      return;
    }
  }
  loading(): any {
    if (this.product != null) {
      return { filter: 'brightness(1)' };
    } else {
      return { filter: 'brightness(0.7)' };
    }
  }
}
