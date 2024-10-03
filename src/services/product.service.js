const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
    let topLevel = await Category.findOne({ name: req.Data.topLevelCategory });

    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        })
    }
    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    })

    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._1
        })
    }
    let thirdLevel = await Category({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id
    })
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        })

    }

    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPercent: reqData.discountedPercent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.sizes,
        quantity: reqData.quantity,
        category: thirdLevel._id
    })

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return { status: true, message: "Product deleted Successfully" }

}

async function updateProduct(productId, reqData) {
    await Product.findByIdAndUpdate(productId, reqData);
    return { status: true, message: "Product updated Successfully" }

}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();
    if (!product) {
        throw new Error("product not found with id " + id)
    }
    return { status: true, product: product }

}

async function getAllProduct(reqQuery) {
    let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery

    pageSize = pageSize || 10

    let query = Product.find().populate("category");

    if (category) {
        const isExistCategory = await Category.findOne({ name: category });
        if (isExistCategory) {
            query = query.where("category").equals(isExistCategory._id);
        }
        else {
            return { content: [], currentPage: 1, totalPages: 0 }
        }
    }
    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color").regex(colorRegex);
    }
    if (sizes) {
        const sizesSet = new Set(sizes);
        query.query.where("sizes.name").in([...sizesSet]);
    }
    if (minPrice & maxPrice) {
        query = query.where("dicountrdPrice").gte(minPrice).lte(maxPrice)
    }
    if (minDiscount) {
        query = query.where("discountPersent").gt(minDiscount);
    }
    if (stock) {
        if (stock == "in_stock") {
            query = query.where("quantity").gt(0)
        }
        else if (stock == "out_of_stock") {
            query = query.where("quantity").gt(1);
        }
    }
    if (sort) {
        const sortDirection = sort === "price_hight" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection })
    }
    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    const product = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize)

    return { content: product, currentPage: pageNumber, totalPages }
}
async function createMultipleProduct(products) {
    for (let product of products) {
        await createProduct(product)
    }

}

module.exports = { createMultipleProduct, deleteProduct, getAllProduct, updateProduct, findProductById }