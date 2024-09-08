import Table from '../models/Table.js';
import { Request } from 'express'
import { RequestHandler } from 'express'
import Item from "../models/Item";

const getTables: RequestHandler = async (req, res) => {
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

const createTable: RequestHandler = async (req, res) => {
    const { restaurantId, no, seats } = req.body;

    // console.log(restaurantId, no, seats);

    try {
        const table = await Table.create({
            no,
            restaurantId,
            seats
        });

        res.json({
            table
        });
    } catch (error) {
        res.status(500).json({ message: 'Error table item', error });
    }
};

const editTable: RequestHandler = async (req, res) => {
    const { _id, restaurantId, no, seats } = req.body;

    try {
        const table = await Table.findByIdAndUpdate(
            _id,
            { restaurantId, no, seats },
        );

        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        res.status(200).json({ table });
    } catch (error) {
        res.status(500).json({ message: 'Error editing table', error });
    }
};

const deleteTable: RequestHandler = async (req, res) => {
    const { tableId } = req.body;

    try {
        const table = await Table.findByIdAndDelete(tableId);

        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        res.json({
            table
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting table', error });
    }
};

export {
    getTables,
    createTable,
    editTable,
    deleteTable
}