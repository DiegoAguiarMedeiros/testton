import { Product } from "../../entities/product/Product";


export interface IProductRepo {
  getAll(id: string, page?: number, pageSize?: number, orderBy?: string, order?: string): Promise<Product[]>
  save(product: Product): Promise<void>;
  getById(id: string, userId: string): Promise<Product | null>;
  update(id: string, userId: string, product: Product): Promise<boolean>;
  delete(id: string): Promise<void>
  getByDescription(description: string, userId: string): Promise<boolean>
}
