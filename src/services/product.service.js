const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {

    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        });
        await topLevel.save(); // Save top-level category to database
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        });
        await secondLevel.save(); // Save second-level category to database
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id
    });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        });
        await thirdLevel.save(); // Save third-level category to database
    }

    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountedPercent: reqData.discountedPercent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        size: reqData.size,
        quantity: reqData.quantity,
        category: thirdLevel._id
    });

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return { status: true, message: "Product deleted Successfully" }

}

async function updateProduct(productId, reqData) {
    console.log("reqData", reqData)
    await Product.findByIdAndUpdate(productId, reqData);
    return { status: true, message: "Product updated Successfully" }

}

async function findProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error("product not found with id " + id)
    }
    return { status: true, product: product }

}

async function getAllProducts(reqQuery) {
    let { category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

    pageNumber = +pageNumber || 1;
    pageSize = +pageSize || 10;

    let query = Product.find().populate("category");
    // console.log("query",query)

    // Category filtering
    if (category && !["undefined", "null"].includes(category)) {
        const isExistCategory = await Category.findOne({ _id: category });
        if (isExistCategory && isExistCategory._id) {
            query = query.where("category").equals(isExistCategory._id);
        } else {
            // If the category doesn't exist, return empty result
            return { content: [], currentPage: pageNumber, totalPages: 0 };
        }
    }

    // Color filtering
    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color").regex(colorRegex);
    }

    // Size filtering
    if (size) {
        const sizesSet = new Set(size);
        query.query.where("sizes.name").in([...sizesSet]);
    }

    // Price range filtering
    if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    // Discount filtering
    if (minDiscount) {
        query = query.where("discountPercent").gt(minDiscount);
    }

    // Stock filtering
    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lte(0);
        }
    }

    // Sorting
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    // Pagination
    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages };
}

async function createMultipleProduct(products) {
    for (let product of products) {
        await createProduct(product)
    }

}

module.exports = { createProduct, createMultipleProduct, deleteProduct, getAllProducts, updateProduct, findProductById }