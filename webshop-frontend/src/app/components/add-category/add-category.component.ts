import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CategoryService],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category = {
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService) {}

  onSubmit() {
    this.categoryService.addCategory(this.category).subscribe(
      response => {
        console.log('Category added successfully', response);
      },
      error => {
        console.error('Error adding category:', error);
      }
    );
  }
}
