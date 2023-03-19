import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async createOne(createUserDto: CreateUserDto): Promise<User> {
        const { email } = createUserDto;
        const found: User = await this.userRepo.findOne({ where: { email: email } });

        if (!found) {
            const newUser: User = this.userRepo.create(createUserDto);
            return this.userRepo.save(newUser);
        }
        throw new ConflictException('Account already exist!');
    }

    async findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async findOneById(id: number): Promise<User> {
        const found: User = await this.userRepo.findOneBy({ id });

        if (!found) throw new NotFoundException(`User id ${id} not found!`);
        return found;
    }

    async findOneByUsername(username: string): Promise<User> {
        const found: User = await this.userRepo.findOneBy({ username });

        if (!found) throw new NotFoundException(`Username ${username} not found!`);
        return found;
    }

    async updateOneById(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        const found: User = await this.findOneById(id);
        const updateOne: UpdateResult = await this.userRepo.update(found.id, updateUserDto);

        if (updateOne.affected === 1) return updateOne;
    }

    async softDeleteOneById(id: number): Promise<DeleteResult> {
        const found: User = await this.findOneById(id);
        const softDelete: DeleteResult = await this.userRepo.softDelete(found.id);

        if (softDelete.affected === 1) return softDelete;
    }
}
