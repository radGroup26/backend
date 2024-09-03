import Order from '../models/Order.js';
import { RequestHandler } from 'express'

const getOrderByTableId: RequestHandler = async (req, res) => {
    const { tableId } = req.params;
    try {
        const order = await Order.find({ tableId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

const createOrder: RequestHandler = async (req, res) => {
    const { restaurantId ,tableId, name, quantity, status } = req.body;

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
};

export {
    getOrderByTableId,
    createOrder
}