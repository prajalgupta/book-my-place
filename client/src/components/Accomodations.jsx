import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

const Accomodations = () =>{
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);

    function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
      }

      function inputDescription(text) {
        return (
          <p className="text-gray-500 text-sm">{text}</p>
        );
      }

      function preInput(header,description) {
        return (
          <div>
            {inputHeader(header)}
            {inputDescription(description)}
          </div>
        );
      }

      async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename}= await axios.post('/upload-by-link', {link:photoLink});
        setAddedPhotos(prev =>{
            return [...prev, filename];
        });
        setPhotoLink('');
      }
   
    return(
        <div>
            {action !== 'new' &&(
                <div className="text-center">
                    <Link className=" inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/user/accomodations/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    Add new</Link>
                </div>
            )}
            {action === 'new' &&(
                <div className="text-left">
                    <form>
                        {preInput('Title', 'title for your place' )}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example:My lovely apartment"/>
                        {preInput('Address', 'Address to the place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
                        {preInput('Photos', 'more is better')}
                        <div className="flex gap-2">
                            <input type = "text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link..'}/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link =>(
                                <div> 
                                    <img src= {'http://localhost:4000/uploads/' +link} alt=""/>
                                </div>
                            )) }
                            <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        {preInput('Description', 'Description of your place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                        {preInput('Perks', 'Select all perks of your place')}
                        <div>
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        {preInput('Extra Info','house rules,etc')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        {preInput('Check-In, Check-Out time', 'add check in and out times, remember to have a window for cleaning between guests')}
                        <div grid gap-2 sm:grid-cols-3>
                            <div>
                                <h3 className="mt-2 -mb-1">Check In time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="11:00"/>
                            </div>
                            <div>
                                <h3>Check Out time</h3>
                                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="10:00"/>
                            </div>
                            <div>
                                <h3>max guests</h3>
                                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="3" />
                            </div>
                        </div>
                            <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Accomodations;