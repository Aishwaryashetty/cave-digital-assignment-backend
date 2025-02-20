import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({ required: true, trim: true })
    title: string;

    @Prop({ trim: true })
    description: string;

    @Prop({ required: true, trim: true })
    userId: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);