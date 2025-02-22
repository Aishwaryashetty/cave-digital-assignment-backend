import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, required: false, default: null })
  resetToken?: string | null;

  @Prop({ type: Date, required: false, default: null })
  resetOtpExpiry?: Date | null;

  @Prop({ type: Number, required: false, default: null })
  resetOtp?: number | null;


}

export const UserSchema = SchemaFactory.createForClass(User);