const productService = require("../services/product.service");

const   createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product);

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id

    try {
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).send(product);

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
const findProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await productService.findProductById(productId);
        return res.status(201).send(product);

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
const getAllProducts = async (req, res) => {
    try {
        console.log("Incoming query params:", req.query);
        const products = await productService.getAllProducts(req.query); // Pass query parameters if needed for filtering
       console.log("products",products)
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const createMultipleProduct = async (req, res) => {
    try {
        const product = await productService.createMultipleProduct(req.body);
        return res.status(201).send({ message: "Products created successfully" });

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}


module.exports = { createProduct, updateProduct, deleteProduct, findProductById, getAllProducts, createMultipleProduct }