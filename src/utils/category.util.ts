import { Category } from '../modules/category/category.model';

export function getShortenedCategory(category: Category): string {
  return category.name;
}

export function getShortenedCategories(categories: Category[]): string[] {
  return categories?.map((item) => item.name);
}

export function checkCategoriesEqual(
  category1: string[],
  category2: Category[],
): boolean {
  return (
    Array.isArray(category1) &&
    Array.isArray(category2) &&
    category1.length === category2.length &&
    category1.every((val, index) => val === category2[index].name)
  );
}
