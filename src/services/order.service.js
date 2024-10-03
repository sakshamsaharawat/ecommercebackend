const Address = require("../models/address.model");
const cartService = require("../services/cart.service");
const Order = require("../models/order.model");
const { default: orders } = require("razorpay/dist/types/orders");

async function createOrder(user, shippingAddress) {
    let address;
    if (shippingAddress._id) {
        let existAddress = await Address.findById(shippAddress._id);
        address = existAddress;
    }
    else {
        address = new Address(shippAddress);
        address.user = user;
        await address.save();

        user.addresses.push(address);
        await user.save()
    }
    const cart = await cartService.findUserCart(user._id);
    const orderItems = []
    for (const item of cart.cartItems) {
        const orderItems = new orderItems({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedprice,
        })

        const createOrdrItem = await orderItem.save();
        orderItems.push(createOrdrItem)
    }
    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountePrice,
        discounte: cart.discounte,
        shippAddress: cart.ddresse
    })
    const saveOrder = await createOrder.save()
    return saveOrder;

}
async function placeOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    return await order.save();

}
async function confrimedOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";
    return await order.save();

}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";
    return await order.save();

}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";
    return await order.save();

}

async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";
    return await order.save();

}

async function findOrderById(orderId) {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")

    return order;

}

async function userOrderHistory(userId) {
    try {
        const order = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()
        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()
}

async function deleteOrder(orderId) {
    try {
        const order = await Order.findOrderById(orderId);
        await Order.findByIdAndDelete(order._id);

        if (!order) {
            return { success: false, message: "Order not found" };
        }
        return { success: true, message: "Order deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports =
{
    createOrder, deliverOrder,
    userOrderHistory, getAllOrders,
    deleteOrder, shipOrder, confrimedOrder,
    cancelledOrder, findOrderById, placeOrder

}


