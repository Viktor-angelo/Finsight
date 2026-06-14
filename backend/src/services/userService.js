import {prisma} from "../config/prisma.js";

export const getUsers = async () =>{
    return await prisma.user.findMany();
};

export const createUser = async() =>{
    return await prisma.user.create({data});
}

export const findUserBtEmail = async(email) =>{
    return await prisma.user.findUnique({
        where: {email},
    });
};