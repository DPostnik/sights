import { Category } from '../category/category.model';

export function getShortenedCategory(category: Category): string {
  return category.name;
}

export function getShortenedCategories(categories: Category[]): string[] {
  return categories.map((item) => item.name);
}
