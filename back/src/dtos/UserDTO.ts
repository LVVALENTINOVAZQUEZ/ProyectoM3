export interface userRegisterDTO{
    name: string,
    email: string,
    birthday: Date,
    dni: number,
    username: string,
    password: string
}

export interface userLoginDTO{
   username: string,
    password: string
}

export interface userResponseDTO{
    name: string,
    email: string,
}