import { UniqueEntityID } from "../../../../domain/shared/UniqueEntityID";


export interface UpdateDTO {
    id: UniqueEntityID;
    userId: UniqueEntityID;
    description?: string;
    price?: number;
    quantity?: number;
}