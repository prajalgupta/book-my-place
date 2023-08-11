const mongoose = require('mongoose');
const{Schema} = mongoose;

const bookingSchema = new Schema({
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    numberOfGuests: {type:Number, required:true},
    name: {type:String, required:true},
    phoneNumber: {type:String, required:true},
    price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;