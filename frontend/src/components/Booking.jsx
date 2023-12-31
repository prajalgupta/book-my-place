import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../containers/AddressLink";
import PlaceGallery from "../containers/PlaceGallery";
import BookingDates from "../containers/BookingDates";

const Booking = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState('');
    
    useEffect(() => {
        axios.get('/bookings').then(response => {
            const foundBooking = response.data.find(({_id}) => _id === id);
            if(foundBooking){
                setBooking(foundBooking);
            }
        });
    }, [id])
    
    if(!booking){
        return'';
    }

    return(
        <div className = "mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className = "text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className = "bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className = "text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking = {booking} />
                </div>
                <div className = "bg-primary p-6 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className = "text-3xl">Rs.{booking.price}</div>
                </div>
            </div>
            <PlaceGallery place = {booking.place}/>
        </div>
    );
}

export default Booking;