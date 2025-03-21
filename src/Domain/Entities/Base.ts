export class BaseEntity {
  public readonly id: string;

  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;
}
