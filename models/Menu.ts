import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: function() {
            return new mongoose.Types.ObjectId();
        }
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    option: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('Menu', menuSchema);