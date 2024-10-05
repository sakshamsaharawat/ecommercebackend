const Address = require("../models/address.model");
const cartService = require("../services/cart.service");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems.model")

async function createOrder(user, shippingAddress) {
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
        // console.log("cart",cart)

        if (!cart.cartItems || cart.cartItems.length === 0) {
            return { message: 'Cart is empty, cannot create order' };
        }
        const orderItems = [];
        // console.log(cart.cartItems)
        for (const item of cart.cartItems) {
            console.log("item---",item)
            const newOrderItem = new OrderItem({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
                discountedPrice: item.discountedPrice,
            });
            // console.log("newOrderItem",newOrderItem)
            const createdOrderItem = await newOrderItem.save();
            orderItems.push(createdOrderItem);

        }
        // console.log(orderItems)

        const createdOrder = new Order({
            user,
            orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountePrice,
            discount: cart.discounte,
            shippingAddress: address,
            totalItem: 1
        });
        // console.log("createdOrder", createdOrder);

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


