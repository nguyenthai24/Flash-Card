import { GENDER, UserRole } from '@/common/shares/enums';
import { BaseEntity } from '@/infrastructure/database/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { UserRole } from '@modules/user-roles/entities/user-role.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({})
export class User extends BaseEntity {
  @Prop({ required: true, minlength: 2, maxlength: 60 })
  first_name!: string;

  @Prop({ required: true })
  last_name!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email!: string;

  @Prop({
    match: /^([+]\d{2})?\d{10}$/,
  })
  phone_number!: string;

  @Prop({
    required: true,
    unique: true,
  })
  username!: string;

  @Prop({
    select: false,
  })
  password?: string;

  @Prop({
    default:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  })
  avatar!: string;

  @Prop()
  date_of_birth!: Date;

  @Prop({
    enum: GENDER,
  })
  gender!: string;

  @Prop({ default: 0 })
  point!: number;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
    required: true,
  })
  role!: UserRole;

  @Prop()
  headline!: string;

  @Prop()
  friendly_id!: number;

  @Prop({ type: Date, default: null })
  email_verified_at?: Date | null;

  @Prop({ select: false })
  verification_token_hash?: string;

  @Prop({ select: false })
  verification_token_expires_at?: Date;

  @Prop({ select: false })
  password_reset_token_hash?: string;

  @Prop({ select: false })
  password_reset_token_expires_at?: Date;

  @Prop({ type: [Object], default: [], select: false })
  refresh_sessions!: {
    id: string;
    tokenHash: string;
    expiresAt: Date;
    rememberMe?: boolean;
  }[];

  @Prop({ default: 0 })
  failed_login_attempts!: number;

  @Prop({ type: Date, default: null, select: false })
  locked_until?: Date | null;

  @Prop({ default: 0 })
  token_version!: number;

  @Prop({ type: [Object], default: [] })
  oauth_accounts!: {
    provider: 'google' | 'facebook' | 'github';
    providerId: string;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// getter setter và virtual fields có thể được định nghĩa ở đây nếu cần

// export const UserSchemaFactory = (
//   flash_card_model: Model<FlashCardDocument>,
//   collection_model: Model<CollectionDocument>,
// ) => {
//   const user_schema = UserSchema;

//   user_schema.pre('findOneAndDelete', async function (next: NextFunction) {
//     // OTHER USEFUL METHOD: getOptions, getPopulatedPaths, getQuery = getFilter, getUpdate
//     const user = await this.model.findOne(this.getFilter());
//     await Promise.all([
//       flash_card_model
//         .deleteMany({
//           user: user._id,
//         })
//         .exec(),
//       collection_model
//         .deleteMany({
//           user: user._id,
//         })
//         .exec(),
//     ]);
//     return next();
//   });
//   return user_schema;
// };
