import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
  standalone: false,
})
export class ProductDialogComponent {
  product: any = {}; // Инициализация пустым объектом
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.product = this.data.product || {}; // Если product не передан, будет пустой объект
      this.isEditMode = this.data.isEditMode || false; // Установка режима редактирования
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveProduct(): void {
    this.dialogRef.close(this.product);
  }
}
