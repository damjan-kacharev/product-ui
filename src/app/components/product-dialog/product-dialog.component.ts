import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface ProductData {
  name: string;
  price: number;
  category: string;
  description: string;
  quantityInStock: number;
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule 
  ]
})
export class ProductDialogComponent {
  productForm: FormGroup;
  categories = [
  { name: 'electronics', value: 0 },
  { name: 'books', value: 1 },
  { name: 'clothing', value: 2 },
  { name: 'beauty', value: 3 },
  { name: 'jewelry', value: 4 },
  { name: 'tools', value: 5 }
];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductData
  ) {
    this.productForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.min(0)]],
      category: [data?.category !== undefined ? data.category : ''],
      description: [data?.description || ''],
      quantityInStock: [data?.quantityInStock || 0, [Validators.required, Validators.min(0)]]
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
