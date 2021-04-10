import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export default async(req, res) => {
    const data = JSON.parse(req.body)

    
    const createdProduct = await prisma.products.create({
        data
    })
    // res.json(createdProduct);

    return res.json(data)
}