import Menu from '../models/Menu.js';
import { RequestHandler } from 'express'

const getMenuByRestaurantId: RequestHandler = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const menu = await Menu.find({ restaurantId });

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.status(200).json(menu);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};

export {
    getMenuByRestaurantId,
}