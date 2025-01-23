import mongoose from 'mongoose'
import OrdersModel from '../models/ordersModel.js'
import productsModel from '../models/productsModel.js'

const checkProductsExist = async (products) => {
    const productsToFind = products.map(item => item.product)
    const foundProducts = await productsModel.find({ '_id': { $in: productsToFind } })
    return foundProducts.length === productsToFind.length
};

export const getOrders = async (req, res) => {
    const orders = await OrdersModel.find()
    res.status(200).json(orders)
}

export const getOrder = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'Order not found.' })
    }
    const order = await OrdersModel.findById(id)
    if (order) {
        res.status(200).json(order)
    } else {
        return res.status(404).json({ error: 'Order not found.' })
    }
}

export const createOrder = async (req, res) => {
    const { tableNumber, products } = req.body

    let emptyFields = [];
    if (!tableNumber) { emptyFields.push('tableNumber'); }
    if (!products || products.length === 0) { emptyFields.push('products') }

    if (products) {
        products.forEach((item, index) => {
            if (!item.product || !item.quantity) {
                emptyFields.push(`Product at index ${index} is missing 'product' or 'quantity'`)
            }
        })
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields })
    }

    try {
        const productsExist = await checkProductsExist(products)
        const order = await OrdersModel.create({
            tableNumber,
            products
        })

        res.status(201).json(order)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


export const updateOrder = 
    async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'Order not found.' })
    }
    const order = await OrdersModel.findOneAndUpdate({ _id: id }, { ...req.body })
    if (order) {
        res.status(200).json(order)
    } else {
        return res.status(404).json({ error: 'Order not found.' })
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'Order not found.' })
    }
    const order = await OrdersModel.findOneAndDelete({ _id: id })
    if (order) {
        res.status(200).json(order)
    } else {
        return res.status(404).json({ error: 'Order not found.' })
    }
}