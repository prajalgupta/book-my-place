import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import UserNav from "../containers/UserNav";
import axios from "axios";
import PlaceImg from "../containers/PlaceImg";
import BookingDates from "../containers/BookingDates";


const Bookings = () => {
    const[bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);

    return(
        <div>
           <UserNav/> 
           <div>
              {bookings?.length > 0 && bookings.map(booking => (
                <Link to={'/profile/bookings/' +booking._id}
                    className = "flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className = "w-48">
                        <PlaceImg place={booking.place}/>
                    </div>
                    <div className = "py-3 pr-3 grow">
                        <h2 className = "text-xl">{booking.place.title}</h2>
                        <BookingDates booking = {booking}/>
                        <div>Total Price: Rs.{booking.price}</div>
                    </div>
                </Link>
              ))} 
           </div>
        </div>
    );
}

export default Bookings;