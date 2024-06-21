import Database from "../../database/query";
import UsersNgu from "../../products/user.product";
import {hashPassword, hashPasswordSalt} from  '../../service';
import {UserIdentityService} from '../../service';

class AuthService {
    constructor(){
        this.database = new Database();
        this.users = new UsersNgu();
        this.userIdentity = new UserIdentityService();
    }
    async getAll(username){
    try {
        const users = await this.database.select(`SELECT * FROM USERS WHERE username = ?`, [username]);
        return users;
    } catch (error){
        console.log(error);
        throw error;
    }
    }

    async getUserWithPaging(page, size, username){
        try {
            const query = `
                select *
                from USERS
                where username like ?
                limit ?, ?
            `;
            const params = [
                `%${username}%`,
                (page - 1) * size,
                size];

            const users = await this.database.select(query, params);
            return users;
        } catch (error){
            console.log(error);
            throw error;
        }
    }
    async getById(id){
        try {
            const query = `SELECT * FROM USERS WHERE id = ?`;
            const users = await this.database.select(query, [id]);
            return users;
        } catch (error){
            console.log(error);
            throw error;
        }
    }

    async createUser(user){
        try {
            const query = `
                insert into users (name, age, gender, password, created_by)
                values (?, ?, ?, ?, ?)
            `;
            const params = [
                user.fullname,
                user.age,
                user.gender,
                user.password,
                user.created_by
            ];
            const id = await this.database.insert(query, params);
            user.id = id;
            return user;
        }
        catch (error){
            console.log(error);
            throw error;
        }
    }

    async update(id, user){
        try{
            const query = `
                update users
                set name = ?, age = ?, gender = ?, updated_by = ?
                where id = ?
            `;
            const params = [
                user.fullname,
                user.age,
                user.gender,
                user.updated_by,
                id
            ];
            const result = await this.database.update(query, params);
            return result;
        } catch (error){
            console.log(error);
            throw error;
        }
    }

    async delete(id){
        try{
            const query = `
                delete from users
                where id = ?
            `;
            const result = await this.database.delete(query, [id]);
            return result;
        } catch (error){
            console.log(error);
            throw error;
        }
    }

    async login(loginDTO){
        try {
            const user = await sthis.userModel.getUserByUsername(loginDTO.username);
            if(!user){
                return new Error("User not found");
            }
            const password = await hashPasswordSalt(loginDTO.password, user.salt);
            if(password !== user.password){
                console.log("Hahahahahahahaha");
                return new Error("Password is not correct");
            }
        console.log("vao day1");
        const token = await this.userIdentity.generateToken(user);
        return token;
        } catch (error){
            console.log(error);
            throw error;
        }
    }
}

export default new AuthService();