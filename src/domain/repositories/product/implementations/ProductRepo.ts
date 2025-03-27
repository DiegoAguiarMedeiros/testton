import { Sequelize } from "sequelize";
import { Product } from "../../../entities/product/Product";
import { IProductRepo } from "../ProductRepo";
import { ProductMap } from "../../../../shared/mappers/ProductMap";

export class ProductRepo implements IProductRepo {

    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getByDescription(description: string, userId: string): Promise<boolean> {
        const model = this.models.Products;
        const product = await model.findOne({
            where: {
                description,
                user_id: userId,
            },
            raw: true,
        });
        return !!product;
    }

    async update(id: string, userId: string, product: Product): Promise<boolean> {
        const model = this.models.Products;
        const rawProduct = await ProductMap.toPersistence(product);
        
        const [updatedRows] = await model.update(
            rawProduct,
            {
                where: {
                    id,
                    user_id: userId,
                },
            }
        );
        if (updatedRows === 0) {
            return false;
        }
        return true;
    }
    async getAll(id: string, page?: number, pageSize?: number, orderBy?: string, order?: string): Promise<Product[]> {

        const model = this.models.Products;
        const limit = pageSize || undefined;
        const offset = page ? (page - 1) * (pageSize || 10) : 0;

        const allowedColumns = ["description", "price", "quantity", "createdAt"];
        const allowedOrders = ["asc", "desc"];

        const safeOrderBy = allowedColumns.includes(orderBy || "") ? orderBy : "createdAt";
        const safeOrder = allowedOrders.includes(order || "") ? order : "desc";


        const numericColumns = ["price", "quantity"]; 

        const orderStatement = numericColumns.includes(safeOrderBy!)
            ? Sequelize.col(safeOrderBy!) 
            : safeOrderBy; 

        const products = await model.findAll({
            where: {
                user_id: id,
            },
            limit: limit,
            offset: offset,
            order: [[orderStatement, safeOrder]], // 🚀 Query segura
        });
        return products.map((product: any) => ProductMap.toDomain(product));
    }
    
    async getById(id: string, userId: string): Promise<Product | null> {
        const model = this.models.Products;
        const product = await model.findOne({
            where: {
                id,
                user_id: userId,
            },
            raw: true,
        });
        return product ?? null;
    }

    async save(product: Product): Promise<void> {
        const model = this.models.Products;
        const rawProduct = await ProductMap.toPersistence(product);
        await model.create(rawProduct);
    }

    async delete(id: string): Promise<void> {
        const model = this.models.Products;
        await model.destroy({
            where: {
                id,
            },
        });
    }

}