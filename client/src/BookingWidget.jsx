import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {UserContext} from "./UserContext.jsx";

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user){
          setName(user.name);  
        }
    },[user]);

    let numberOfDays = 0;
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function BookPlace(){
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phoneNumber,
            place:place._id,
            price:numberOfDays * place.price,
        });
        setRedirect('/profile/bookings/' +response.data._id);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className = "text-2xl text-center">
                Price: Rs. {place.price}/ per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className = "py-3 px-4">
                        <label>Check in:</label>
                        <input type = "date" 
                               value={checkIn} 
                               onChange={ev => setCheckIn(ev.target.value)}/>
                    </div>
                    <div className = "py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input type = "date" 
                               value={checkOut} 
                               onChange={ev => setCheckOut(ev.target.value)}/>
                    </div>
                </div>
                <div className = "py-3 px-4 border-t">
                        <label>Number of Guests</label>
                        <input type = "number" 
                               value={numberOfGuests} 
                               onChange={ev => setNumberOfGuests(ev.target.value)}/>
                </div>
                {numberOfDays > 0 &&(
                    <div className = "py-3 px-4 border-t">
                        <label>Full Name</label>
                        <input type = "text" 
                            placeholder="name"
                            value={name} 
                            onChange={ev => setName(ev.target.value)}/>

                        <label>Phone Number</label>
                        <input type = "tel" 
                            value={phoneNumber} 
                            onChange={ev => setPhoneNumber(ev.target.value)}/>
                    </div>
                )}
            </div>
            <button onClick={BookPlace} className = "primary mt-4 ">
                Book now
                {numberOfDays > 0 &&(
                    <span> Rs.{numberOfDays * place.price}</span>
                )}
            </button>
            
        </div>
        
    );
}
export default BookingWidget;