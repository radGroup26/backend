import mongoose from 'mongoose';
const tableSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId();
        }
    },
    no: {
        type: Number,
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    isOccupied: {
        type: Boolean,
        default: false,
    }
});
export default mongoose.model('Table', tableSchema);
