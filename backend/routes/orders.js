const {Order} = require('../models/orders');
const express = require('express');
const { OrderItem } = require('../models/order-items');
const router = express.Router();
const { Product } = require('../models/products');
const stripe = require('stripe')('sk_test_51Lk5fxJXwXjcmUVPbmkS0fu9aCefPpOqzB1gsVbaOZxZ3lHR9V3EzZFKHWfM3HIX0E0wfm5Tcil62D4y6bZZ1n4t00nAvdvE7S');
const crypto = require('crypto');
const {Token} = require('../models/successToken')
//get all orders
router.get(`/`, async (req, res) =>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});
    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

//get a specific order
router.get(`/:id`, async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        });

    if(!order) {
        res.status(500).json({success: false})
    } 
    res.send(order);
})



//add an order
router.post('/', async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems?.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);
    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();
    if(!order)
    return res.status(400).send('the order cannot be created!')
    res.send(order);
})



router.post('/create-checkout-session', async (req, res) => {
    const orderItems = req.body;

    const generateToken = ()=>{
        return crypto.randomBytes(20).toString('hex');
    }

    if (!orderItems) {
        return res.status(400).send('checkout session cannot be created - check the order items');
    }
    const lineItems = await Promise.all(
        orderItems.map(async (orderItem) => {
            const product = await Product.findById(orderItem.product);
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price * 100
                },
                quantity: orderItem.quantity
            };
        })
    );
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:4200/success',
        cancel_url: 'http://localhost:4200/error'
    });

    //create token for success page
    new Token ({
        generateToken,
        userId: req.body.userId
    })

    res.json({ id: session.id });
});




router.put('/:id',async (req, res)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )
    if(!order)
    return res.status(400).send('the order cannot be update!')
    res.send(order);
})

//delete
router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err}) 
    })
})


//total sale
router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])
    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }
    res.send({totalsales: totalSales.pop().totalsales})
})



//counter of orders
router.get(`/get/count`, async (req, res) =>{
    const orderCount = await Order.countDocuments()
    if(!orderCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        orderCount: orderCount
    });
})


//find users Order
router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
})



module.exports =router;