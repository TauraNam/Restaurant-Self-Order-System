import mongoose from 'mongoose'

const Schema = mongoose.Schema
const orderSchema = new Schema({
    tableNumber: {
        type: String,
        required: true
    },
    products: [{
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Products',
            required: true
        },
        quantity: { 
            type: Number, 
            required: true 
        }
    }],
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)