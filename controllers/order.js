import Order from '../models/Order.js';
const getOrderByTableId = async (req, res) => {
    const { tableId } = req.params;
    try {
        let order = await Order.find({ status: { $nin: ['Finished', 'Declined'] } });
        if (!order) {
            return res.status(404).json({ message: 'Orders not found' });
        }
        // Filter orders by required tableId
        order = order.filter(order => order.tableId.toString() === tableId);
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};
const createOrder = async (req, res) => {
    const { restaurantId, tableId, name, quantity, status } = req.body;
    try {
        const order = await Order.create({
            restaurantId,
            tableId,
            name,
            quantity,
            status
        });
        res.json({
            order
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};
const deleteOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findOneAndDelete({ _id: orderId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({
            order
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};
const cancelOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({
            order
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error cancelling order', error });
    }
};
const finishOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: 'Finished' });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ message: 'Error finishing order', error });
    }
};
const declineOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: 'Declined' });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ message: 'Error declining order', error });
    }
};
const startOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: 'InProgress' });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ message: 'Error starting order', error });
    }
};
const completeOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: 'Completed' });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ order });
    }
    catch (error) {
        res.status(500).json({ message: 'Error completing order', error });
    }
};
export { getOrderByTableId, createOrder, deleteOrder, cancelOrder, finishOrder, declineOrder, startOrder, completeOrder, };
