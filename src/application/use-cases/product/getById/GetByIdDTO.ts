import { UniqueEntityID } from "../../../../domain/shared/UniqueEntityID";

export interface GetByIdDTOResquest {
    Id: UniqueEntityID;
    userId: UniqueEntityID;
}