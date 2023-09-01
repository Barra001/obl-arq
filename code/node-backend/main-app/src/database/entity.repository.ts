import { Document, Model, AnyKeys, AnyObject, Types } from "mongoose";
import { AppException } from "./../exception_filter/app.exception";

export class NotFoundException extends AppException {
  constructor() {
    super(404, "Element not Found");
  }
}

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async getAll(refs: string[] = []): Promise<T[]> {
    const query = this.entityModel.find();

    refs.forEach((ref) => query.populate(ref));

    return await query.exec();
  }

  async getCount(): Promise<number> {
    return await this.entityModel.countDocuments({}).exec();
  }

  async getCountBy(groupBy: string): Promise<T[]> {
    const filter = "$" + groupBy;
    const query = this.entityModel.aggregate([
      {
        $group: {
          _id: { [groupBy]: filter },
          count: { $sum: 1 },
        },
      },
    ]);

    return await query.exec();
  }

  async findById(id: string, refs: string[] = []): Promise<T> {
    const filters: object = { _id: new Types.ObjectId(id) };
    const query = this.entityModel.find(filters);

    refs.forEach((ref) => query.populate(ref));

    const result = await query.exec();

    if (result.length === 0) {
      throw new NotFoundException();
    }

    return result[0];
  }

  async find(filters = {}, refs: string[] = []): Promise<T> {
    const query = this.entityModel.find(filters);

    refs.forEach((ref) => query.populate(ref));

    const result = await query.exec();

    if (result.length === 0) {
      throw new NotFoundException();
    }

    return result[0];
  }

  async exists(filters = {}, refs: string[] = []): Promise<boolean> {
    const query = this.entityModel.find(filters);

    refs.forEach((ref) => query.populate(ref));

    const result = await query.exec();

    return !(result.length === 0);
  }

  async save(document: T): Promise<T> {
    await document.save();

    return document;
  }

  async create(data: AnyKeys<T> & AnyObject): Promise<T> {
    const document = new this.entityModel(data);
    return await this.save(document as unknown as T);
  }

  async update(document: T): Promise<T> {
    return await this.save(document);
  }
}
