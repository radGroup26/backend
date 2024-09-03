import Item from '../models/Item.js';
const getItemByRestaurantId = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const item = await Item.find({ restaurantId });
        if (!item) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(item);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};
const createItem = async (req, res) => {
    const { restaurantId, name, description, option, price } = req.body;
    try {
        const item = await Item.create({
            restaurantId,
            name,
            description,
            option,
            price
        });
        res.json({
            item
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating item', error });
    }
};
export { getItemByRestaurantId, createItem };
