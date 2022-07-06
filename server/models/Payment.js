const mongoose = require('mongoose');
//김범준 멋쟁이
//나이스 나이스
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