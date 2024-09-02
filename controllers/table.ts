import Table from '../models/Table.js';
import { Request } from 'express'
import { RequestHandler } from 'express'

const getTablesByRestaurantId: RequestHandler = async (req, res) => {
    const { restaurantId } = req.params;
    // console.log(restaurantId)
    try {
        // console.log("Inside getTablesByRestaurantId");
        const table = await Table.find({ restaurantId });
        // console.log(table);

        if (!table) {
            return res.status(404).json({ message: 'Tables not found' });
        }

        res.status(200).json(table);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching tables', error });
    }
};

export {
    getTablesByRestaurantId,
}