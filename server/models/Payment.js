const mongoose = require('mongoose');

//ㅎㅇㅎㅎㅇㅎㅇ
//바꿔지롱~


//아아아아아앙아아아아앙
//하이하이 하이하이 

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