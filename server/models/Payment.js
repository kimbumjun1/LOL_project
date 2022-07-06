const mongoose = require('mongoose');

//바꿔지롱~

const paymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }