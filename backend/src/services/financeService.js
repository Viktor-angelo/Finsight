import { PrismaClient } from "../config/prisma.js";

export const getFinances = async()=>{
    return await prisma.finances.findMany();
};

export const getFinancesByUser = async (userId)=>{
    return await prisma.finances.findMany({
        where: {userId},
    });
};

export const createFinance = async (data)=>{
    return await prisma.finances.create({data});
};
export const updateFinance = async (id, data)=>{
    return await prisma.finances.update({
        where: {id},
        data,
    });
};

export const deleteFinance = async (id)=>{
    return await prisma.finances.delete({
        where: {id},
    });
};