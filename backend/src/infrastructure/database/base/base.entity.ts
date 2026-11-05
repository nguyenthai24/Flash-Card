import { Prop } from '@nestjs/mongoose/dist/decorators/prop.decorator';
import { Types } from 'mongoose';

export class BaseEntity {
  _id?: string; // Sau này sẽ dùng với class-transformer để serialize dữ liệu response

  @Prop({ default: null })
  deleted_at?: Date; // Dùng cho soft delete

  @Prop({ default: Date.now })
  created_at?: Date;

  @Prop({ default: Date.now })
  updated_at?: Date;
}
