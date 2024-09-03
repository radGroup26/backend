import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Table',
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Finished', 'Declined'],
        default: 'Pending',
    },
}, { timestamps: true });
// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User',
//     },
//     products: [
//         {
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 required: true,
//                 ref: 'Product',
//             },
//             quantity: {
//                 type: Number,
//                 required: true,
//             },
//         },
//     ],
// }, { timestamps: true })
export default mongoose.model('Order', orderSchema);
