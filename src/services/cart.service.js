const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const CartItem = require("../models/cartItem.model");

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;

    } catch (error) {
        throw new Error(message.error)
    }

}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId })
            .populate('cartItems');

        if (!cart) {
            throw new Error('Cart not found for the user.');
        }

        if (!cart.cartItems || cart.cartItems.length === 0) {
            throw new Error('No items found in the cart.');
        }

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.discounte = totalPrice - totalDiscountedPrice;

        await cart.save();
        const carts = await Cart.find()
            .populate({
                path: "cartItems",
                populate: {
                    path: "product",
                    model: "product",
                },
            })
            .exec();
        return carts;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}


async function addCartItem(userId, req) {
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return { status: false, message: "Cart not found" };
        }

        // Fetch the product details
        const product = await Product.findById(req.productId);
        if (!product) {
            return { status: false, message: "Product not found" };
        }

        // Check if the product is already in the cart
        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });
        if (isPresent) {
            return { status: false, message: "Item already in cart" };
        }

        // Create a new cart item
        const cartItem = new CartItem({
            product: product._id,
            cart: cart._id,
            quantity: 1,
            userId,
            price: product.price,
            size: req.size,
            discountedPrice: product.discountedPrice,
        });

        // Save the cart item
        await cartItem.save();

        // Add the new cart item to the cart and save
        cart.cartItems.push(cartItem);
        await cart.save();

        return {
            status: true,
            message: "Item added to cart"
        };
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { createCart, findUserCart, addCartItem }