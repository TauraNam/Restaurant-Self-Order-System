import mongoose from 'mongoose'

const Schema = mongoose.Schema
const orderSchema = new Schema({
    tableNumber: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    notes: {
        type: String,
        maxlength: 250,
    },
    orderPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Declined", "In-process", "Completed"],
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)