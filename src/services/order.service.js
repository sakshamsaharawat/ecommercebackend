const Address = require("../models/address.model");
const cartService = require("../services/cart.service");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems.model");
const Cart = require("../models/cart.model");

async function createOrder(user, shippingAddress) {
    // console.log("user===",user)
    // console.log("shippingAddress===",shippingAddress)
    try {
        let address;
        if (shippingAddress._id) {
            let existAddress = await Address.findById(shippingAddress._id);
            address = existAddress;
        } else {
            address = new Address(shippingAddress);
            address.user = user._id;
            await address.save();
            user.address.push(address);
            await user.save();
        }

        const cart = await cartService.findUserCart(user._id);

        if (!cart.length || cart[0].cartItems.length === 0) {
            return { message: 'Cart is empty, cannot create order' };
        }
        const orderItems = [];
        
        for (const item of cart[0].cartItems) {
            const newOrderItem = new OrderItem({
                price: item.price,
                product: item.product[0]._id,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
                discountedPrice: item.discountedPrice,
            });
            
            const createdOrderItem = await newOrderItem.save();
            orderItems.push(createdOrderItem);

        }

        const createdOrder = new Order({
            user,
            orderItems,
            totalPrice: cart[0].totalPrice,
            totalDiscountedPrice: cart[0].totalDiscountedPrice,
            discount: cart[0].discounte,
            shippingAddress: address,
            totalItem: 1
        });
        console.log("createdOrder", createdOrder);
        return await createdOrder.save();
    } catch (error) {
        console.log(error)
    }
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    return await order.save()
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


