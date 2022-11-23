import Product from "../models/Product"

export const getProducts = async (req, res) => {
    res.json(await Product.find())
}

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body
    const product = new Product({ name, category, price, imgURL })
    res.status(201).json(await product.save())
}

export const getProduct = async (req, res) => {
    res.status(200).json(await Product.findById(req.params.productID))
}

export const updateProduct = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productID, req.body, {
        new: true
    })

    res.status(200).json(updateProduct)
}

export const deleteProduct = async (req, res) => {
    res.status(200).json(await Product.findByIdAndDelete(req.params.productID))
}