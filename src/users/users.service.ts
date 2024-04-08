import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 5,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const roleArray = (this.users.filter(user => user.role === role))
            if (roleArray.length === 0) throw new NotFoundException('User role not found')
            return roleArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHeighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: usersByHeighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
