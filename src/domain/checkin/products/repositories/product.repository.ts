import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { IRepository } from 'src/domain/@shared/protocols/repository';

export type categoriesToCreate = {
  id: string;
  name: string;
  description: string;
}[];

export interface IProductRepository extends IRepository<Product> {
  findByCategory(id: string): Promise<Product[]>;
  updateQuantity(id: string, quantity: number): Promise<number>;
  findOrCreateCategories(categories: categoriesToCreate): Promise<void>;
  getCategories(): Promise<Category[]>;
}
