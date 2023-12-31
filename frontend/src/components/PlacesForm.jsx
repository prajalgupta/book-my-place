import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../containers/Perks";
import UserNav from "../containers/UserNav";
import PhotosUploader from "../containers/PhotosUploader";

const PlacesForm = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if(!id){
        return;
      }
      axios.get('/places/'+id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
    }, [id]);

    const inputHeader = (text) => {
        return (
          <h2 className = "text-2xl mt-4">{text}</h2>
        );
      }

    const inputDescription = (text) => {
        return (
          <p className = "text-gray-500 text-sm">{text}</p>
        );
      }

    const preInput = (header,description) => {
        return (
          <div>
            {inputHeader(header)}
            {inputDescription(description)}
          </div>
        );
      }
    
      async function savePlace(ev){
        ev.preventDefault(); 
        const placeData = {
          title, address, addedPhotos,
          description, perks, extraInfo,
          checkIn, checkOut, maxGuests, price
        };
        if (id) {
          //update
          await axios.put('/places', {
            id, ...placeData
          });
          setRedirect(true);
        }else {
          //new place
          await axios.post('/places', placeData);
          setRedirect(true);
        }
      }
      
      if (redirect){
        return <Navigate to = {'/profile/places'} />
      }

    return(
        <div>
          <UserNav/>
            <form onSubmit = {savePlace}>
                {preInput('Title', 'title for your place' )}
                <input type = "text" value = {title} onChange = {ev => setTitle(ev.target.value)} placeholder = "title, for example:My lovely apartment"/>
                {preInput('Address', 'Address to the place')}
                <input type = "text" value = {address} onChange = {ev => setAddress(ev.target.value)} placeholder = "address"/>
                {preInput('Photos', 'more is better')}
                <PhotosUploader addedPhotos = {addedPhotos} onChange = {setAddedPhotos}/>
                {preInput('Description', 'Description of your place')}
                <textarea value = {description} onChange = {ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'Select all perks of your place')}
                <div>
                    <Perks selected = {perks} onChange = {setPerks}/>
                </div>
                {preInput('Extra Info','house rules,etc')}
                <textarea value = {extraInfo} onChange = {ev => setExtraInfo(ev.target.value)}/>
                {preInput('Check-In, Check-Out time', 'add check in and out times, remember to have a window for cleaning between guests')}
                <div className = "grid grid-cols-2 md:grid-cols-4" >
                    <div>
                        <h3 className = "mt-2 -mb-1">Check In time</h3>
                        <input type = "text" value = {checkIn} onChange = {ev => setCheckIn(ev.target.value)} placeholder = "11:00"/>
                    </div>
                    <div>
                        <h3 className = "mt-2 -mb-1">Check Out time</h3>
                        <input type = "text" value = {checkOut} onChange = {ev => setCheckOut(ev.target.value)} placeholder = "10:00"/>
                    </div>
                    <div>
                        <h3 className = "mt-2 -mb-1">max guests</h3>
                        <input type = "number" value = {maxGuests} onChange = {ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className = "mt-2 -mb-1">Price per night</h3>
                        <input type = "number" value = {price} onChange = {ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className = "primary my-4">Save</button>
            </form>
        </div>
    );
}

export default PlacesForm;