import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component'; 

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
  standalone: false,
})
export class ProductTableComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'unitCost',
    'actions',
  ];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '250px',
      data: { product: {}, isEditMode: false }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Результат из диалога:', result);

      if (result) {
        const { id, name, quantity, unitCost } = result;

        
        if (id && name && quantity && unitCost) {
          console.log('Отправляем на сервер:', result);
          this.productService.createProduct(result).subscribe(
            (product) => {
              console.log('Добавленный продукт:', product);

              
              this.products.push(product);
              this.products = [...this.products]; 
            },
            (error) => {
              console.error('Ошибка при добавлении продукта:', error);
            }
          );
        } else {
          console.error('Данные некорректны или неполные:', result);
        }
      } else {
        console.log('Диалог был закрыт без сохранения');
      }
    });
  }

  openViewProductDialog(product: any): void {
    this.openDialog(product, false); 
  }

  
  openEditProductDialog(product: any): void {
    this.openDialog(product, true); 
  }

  
  openDialog(product: any, isEditMode: boolean = false): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '250px',
      data: { product, isEditMode }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.isUpdated) {
        const index = this.products.findIndex(
          (p) => p.id === result.product.id
        );
        if (index !== -1) {
          this.products[index] = result.product;
        }
      }
    });
  }

  
  deleteProduct(product: any): void {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter((p) => p.id !== product.id);
    });
  }
}
