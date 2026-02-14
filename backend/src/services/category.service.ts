
import { CategoryModel, CategoryDocument } from '../models/Category';

class CategoryService {
  async getAllCategories(): Promise<CategoryDocument[]> {
    // lean() – щоб повернути “чисті” об’єкти без Mongoose-методів
    return CategoryModel.find().lean();
  }
}

export const categoryService = new CategoryService();