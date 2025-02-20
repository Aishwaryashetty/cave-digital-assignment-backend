import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
    title: string;
    description: string;
    userId: string;
}