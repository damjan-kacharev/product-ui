import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../../products.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  category: number;
  description: string;
  quantityInStock: number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantityInStock', 'category', 'details', 'remove'];
  dataSource = new MatTableDataSource<Product>();
  //dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  categories = [
    { name: 'electronics', value: '0' },
    { name: 'books', value: '1' },
    { name: 'clothing', value: '2' },
    { name: 'beauty', value: '3' },
    { name: 'jewelry', value: '4' },
    { name: 'tools', value: '5' }
  ];
  totalCount = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loadProducts(1, 10);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.loadProducts(event.pageIndex + 1, event.pageSize);
    });
  }

  private loadProducts(page: number, pageSize: number) {
    this.productService.getProducts({ page, pageSize }).subscribe((results: any) => {
      this.dataSource.data = results.products;
      this.totalCount = results.totalCount;

    });
  }

  public addProduct() {
    var dialogRef = this.dialog.open(ProductDialogComponent, { height: '70%', width: '50%' });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.productService.createProduct(res).subscribe(() => {
          this.loadProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);
        });
      }
    });
  }

  public getCategoryNameByValue(value: number): string | undefined {
    if (value == null || undefined) { return 'no data'; }
    const category = this.categories.find(cat => cat.value === value.toString());
    return category?.name;
  }

  public removeProduct(id: number) {
    var dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.loadProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);
        });
      }
    });
  }

  public openDetails(id: number) {
    this.router.navigate(['/products/', id]);
  }
}
