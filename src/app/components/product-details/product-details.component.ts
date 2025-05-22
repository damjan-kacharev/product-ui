import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductService } from '../../products.service';
import { ActivatedRoute } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

interface Product {
  id: number;
  name: string;
  price: number;
  category: number;
  description: string;
  quantityInStock: number;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  // @Input() product: Product | null = null; // Receiving product details as input
  // public product = {
  //   name: 'prod name',
  //   price: 199.99,
  //   category: 'Electronics',
  //   description: 'A top-of-the-line widget for all your needs. Built with durability and performance in mind.',
  //   quantityInStock: 50
  // };

  public productData: any;
  private id: any;

  categories = [
    { name: 'electronics', value: '0' },
    { name: 'books', value: '1' },
    { name: 'clothing', value: '2' },
    { name: 'beauty', value: '3' },
    { name: 'jewelry', value: '4' },
    { name: 'tools', value: '5' }
  ];

  public getCategoryNameByValue(value: number): string | undefined {
    if (value == null || undefined) { return 'no data'; }
    const category = this.categories.find(cat => cat.value === value.toString());
    return category?.name;
  }

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = undefined;
    this.route.paramMap.subscribe(params => {
      id = params.get('id');
      this.id = id
    });
    if (id != undefined) {
      this.productService.getProduct(id).subscribe((res) => {
        this.productData = res;
      });
    }

  }

  public editProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      height: '70%',
      width: '50%',
      data: this.productData
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if(res){
        let prod = { ... res };
        prod.category = this.getCategoryNameByValue(prod?.category);
        this.productService.updateProduct(this.id, prod).subscribe(() => {
          this.productData = res;
      });
      }
    });
  }
}
