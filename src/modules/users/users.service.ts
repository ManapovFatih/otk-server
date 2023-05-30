import { ImageService } from './../file/image.service';
import { PrismaService } from '../../modules/database/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { Password } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService, private imageService: ImageService) {}
    async create(createUserDto: CreateUserDto, password: string, image: Express.Multer.File): Promise<User> {
        let filename = '';

        if (image) {
            filename = await this.imageService.updateImage(image, 'users');
        }

        const user = await this.prismaService.user.create({
            data: {
                ...createUserDto,
                image: filename,
                password: {
                    create: { password: password },
                },
            },
        });
        return user;
    }

    async findOne(id: number): Promise<User> {
        return await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async findOneByUserId(userId: number): Promise<Password> {
        return await this.prismaService.password.findUnique({
            where: {
                userId: userId,
            },
        });
    }
    
    async update(id: number, updateUserDto: UpdateUserDto, image: Express.Multer.File): Promise<User> {
        const userBeforeUpdate = await this.prismaService.user.findFirstOrThrow({
            where: { id },
        });

        let filename = userBeforeUpdate.image;

        filename = await this.imageService.updateImage(image, 'users');

        delete updateUserDto.setImageToNull;

        return await this.prismaService.user.update({
            where: {
                id: id,
            },
            data: { ...updateUserDto, image: filename },
        });
    }

    async delete(id: number): Promise<User> {
        const deletedUser = await this.prismaService.user.delete({
            where: {
                id: id,
            },
        });
        if (deletedUser.image && deletedUser.image != '') {
            await this.imageService.deleteImage(deletedUser.image);
        }
        return deletedUser;
    }
}
