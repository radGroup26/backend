import Item from '../models/Item.js';
import { RequestHandler } from 'express'

const getItemByRestaurantId: RequestHandler = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const item = await Item.find({ restaurantId });

        if (!item) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.status(200).json(item);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};

export {
    getItemByRestaurantId,
}