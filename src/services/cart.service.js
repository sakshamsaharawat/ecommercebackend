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
        cart.discounte = totalPrice - totalDiscountedPrice;
        return cart;

    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}


async function addCartItem(userId, req) {
    try {
        const cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(req.productId);

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId })

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice,
            })

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return { status: true, message: "Item added to cart" }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { createCart, findUserCart, addCartItem }