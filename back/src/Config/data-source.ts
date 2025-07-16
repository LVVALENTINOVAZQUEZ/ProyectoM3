import { DataSource, Repository } from "typeorm";
import { DB_DROP, DB_HOST, DB_LOG, DB_NAME, DB_PASSWORD, DB_PORT, DB_SYNC, DB_USER } from "./envs";
import { User } from "../entities/UserEntity";
import { Credential } from "../entities/CredentialsEntities";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,         
    port: DB_PORT,         
    username: DB_USER,         
    password: DB_PASSWORD,      
    database: DB_NAME,        
    synchronize: DB_SYNC,         
    dropSchema: DB_DROP,         
    logging: DB_LOG,         
    entities: ["src/entities/**/*.ts"],
})

export const UserModel: Repository<User> = AppDataSource.getRepository(User)
export const CredentialModel: Repository<Credential> = AppDataSource.getRepository(Credential)