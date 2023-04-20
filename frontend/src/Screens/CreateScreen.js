import axios from "axios"
import React, { useEffect, useReducer, useState, useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../CSS/Map.css';
import '../CSS/CreateScreen.css';
import {baseUrl} from '../lib';



//Google Map
import {
    LoadScript,
    GoogleMap,
    StandaloneSearchBox,
    Marker,
  } from '@react-google-maps/api';




const libs = ['places'];
const defaultLocation = { lat: 45.516, lng: -73.56 };




export const CreateScreen = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newDepartment, setNewDepartment] = useState('Marketing');
    const [newStatus, setNewStatus] = useState('Remote Location');



    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
    }

    const handleDepartmentChange = (event) => {
        setNewDepartment(event.target.value);
    }


    const createHandler = async () => {

        try {

            if(newAge < 18 || newAge == '') {
                alert('Enter valid age');
                return ;
            }

            if(pincode < 100000 || pincode == '') {
                alert('Enter valid pincode');
                return ;
            }

            const {data} = await axios.post(
                `${baseUrl}/api/emp`,
                {
                    fullName: {firstName, lastName},
                    completeAddress: {addressLine1, addressLine2, city, stateName, country, pincode},
                    mapAddress: {
                        address,
                        lat,
                        lng,
                        name,
                        vicinity,
                        googleAddressId,
                    },
                    age: newAge,
                    department: newDepartment,
                    status: newStatus
                }
            )
            navigate('/');
        }

        catch(err) {
            alert('Failed to create employee data');
            console.log(err);
        }
    }


    //Google Map
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [vicinity, setVicinity] = useState('');
    const [googleAddressId, setGoogleAddressId] = useState('');


    const [googleApiKey, setGoogleApiKey] = useState('');


    const [center, setCenter] = useState(defaultLocation);
    const [location, setLocation] = useState(center);


    const mapRef = useRef(null);
    const placeRef = useRef(null);
    const markerRef = useRef(null);


    const fetchMapData = async () => {

        const { data } = await axios.get(
          `${baseUrl}/api/config/google`
          );
        setGoogleApiKey(data);
    };


    const refreshPage = () => {
        window.location.reload(true);
    }


    useEffect(() => {

        fetchMapData();
        //refreshPage();

    }, []);


    const onLoad = (map) => {
        mapRef.current = map;
    };
    
    
    const onMarkerLoad = (marker) => {
        markerRef.current = marker;
    };
    
    
    const onLoadPlaces = (place) => {
        placeRef.current = place;
    };
    
    
    const onIdle = () => {
        setLocation({
          lat: mapRef.current.center.lat(),
          lng: mapRef.current.center.lng(),
        });
    };
    
    
    const onPlacesChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({ lat: place.lat(), lng: place.lng() });
        setLocation({ lat: place.lat(), lng: place.lng() });
    };
    
    
    const onConfirm = async () => {
        const places = placeRef.current.getPlaces();

        if (places && places.length === 1) {

            setAddress(places[0].formatted_address);
            setLat(location.lat);
            setLng(location.lng);
            setName(places[0].name);
            setVicinity(places[0].vicinity);
            setGoogleAddressId(places[0].id);
           
          alert('location selected successfully.');
        } 
        else {
          alert('Please enter your address on the map');
        }

    };



    return (
        <div className="createScreen">

        <div className="create">

        <div className='left'>

        <h1>Enter New Employee Data</h1>

        <input className='input' type='text' placeholder="First Name *"
        onChange={(e) => {
            setFirstName(e.target.value);
        }}
        />

        <input className='input' type='text' placeholder="Last Name *"
        onChange={(e) => {
            setLastName(e.target.value);
        }}
        />

        <input className='input' type='Number' placeholder="Age *"
        onChange={(e) => {
            setNewAge(e.target.value);
            
        }}
        />

        <input className='input' type='text' placeholder="Address Line 1 *"
        onChange={(e) => {
            setAddressLine1(e.target.value);
        }}
        />

        <input className='input' type='text' placeholder="Address Line 2"
        onChange={(e) => {
            setAddressLine2(e.target.value);
        }}
        />

        <input className='input' type='text' placeholder="City *"
        onChange={(e) => {
            setCity(e.target.value);
        }}
        />

        <input className='input' type='text' placeholder="State *"
        onChange={(e) => {
            setStateName(e.target.value);
        }}
        />

        <input className='input' type='text' placeholder="Country *"
        onChange={(e) => {
            setCountry(e.target.value);
        }}
        />

        <input className='input' type='Number' placeholder="Pincode *"
        onChange={(e) => {
            setPincode(e.target.value);
        }}
        />

        <div>Department *</div>
        <select className='input' name='option' onChange={handleDepartmentChange} required>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Human Resource">Human Resource</option>
            <option value="IT">IT</option>
        </select>

        <div>Job Status *</div>
        <select className='input' name='option' onChange={handleStatusChange} required>
            <option value="Remote Location">Remote Location</option>
            <option value="Contract Employee">Contract Employee</option>
            <option value="Full-Time">Full-Time</option>
        </select>

        {/* <button onClick={() => {
            createHandler();
        }}>Create New User</button> */}

        </div>

        <div className="right">

        <h3>Locate address on map *</h3>

        <button className="btn" onClick={() => {
            refreshPage();
        }}>Reload Map</button>

        {
        googleApiKey 
        ? 
        (

        <div className="full-container">
        <LoadScript libraries= {libs} 
        googleMapsApiKey={googleApiKey}
        >

        <StandaloneSearchBox
        onLoad={onLoadPlaces}
        onPlacesChanged={onPlacesChanged}
        >
        <div className="map-input-box">
        <input type="text" placeholder="Enter your address *" autoComplete="new-password"></input>
        <button type="button" className="primary" onClick={onConfirm}>
            Confirm
        </button>
        </div>
        </StandaloneSearchBox>


        <GoogleMap
        id="smaple-map"
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={center}
        zoom={15}
        options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }}
        onLoad={onLoad}
        onIdle={onIdle}
        >

        <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
        </LoadScript>
        </div>

        ) : (<div>Loading...</div>)

        } 

        </div>

        </div>

        <button className="btn" onClick={() => {
            createHandler();
        }}>Create New User</button>

        


       



        </div>
    )
}