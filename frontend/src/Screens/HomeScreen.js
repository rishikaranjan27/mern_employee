import axios from "axios"
import React, { useEffect, useReducer, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../CSS/HomeScreen.css';
import {baseUrl} from '../lib';


//Google Map
import {
    StaticGoogleMap,
    Marker,
} from 'react-static-google-map';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';






export const HomeScreen = () => {

    const navigate = useNavigate();

    const [empData, setEmpData] = useState([]);


    const fetchData = async () => {

        try {
            const {data} = await axios.get(
                `${baseUrl}/api/emp`
            );

            console.log('data', data);  
            setEmpData(data);

        }

        catch (err) {
            console.log(err);
        }

    };


    const deleteHandler = async (id) => {

        try {
            const {data} = await axios.delete(
                `${baseUrl}/api/emp/${id}`
            ) 

            fetchData();
        }

        catch(err) {
            console.log(err);
        }
    }


    //View 
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [viewData, setViewData] = useState([]);

    const getEmpData = async (id) => {

        try {
            const {data} = await axios.get(
                `${baseUrl}/api/emp/${id}`
            )

            setViewData(data);

            setLatitude(data.mapAddress.lat);
            setLongitude(data.mapAddress.lng);
            setLocation({lat: latitude, lng: longitude});
        }
        catch(err) {
            console.log(err);
        }
    }
    


    //Google Map
    const [latitude, setLatitude] = useState('45.516');
    const [longitude, setLongitude] = useState('-73.56');

    const defaultLocation = { lat: latitude, lng: longitude };

    const [googleApiKey, setGoogleApiKey] = useState('');
    const [location, setLocation] = useState(defaultLocation);

    const fetchGoogleMap = async () => {
        const { data } = await axios(
            `${baseUrl}/api/config/google`
            );
          setGoogleApiKey(data);

    }


    //common
    useEffect(() => {

        fetchData();
        fetchGoogleMap();

    }, [navigate, location]);




    return (
        <div className="homeScreen">

            <div className="header">

                <div className="header__left">

                    <h1>Employee Management System</h1>

                </div>


                <div className="header__right">

                    <button onClick={() => {
                        navigate('/create');
                    }}>Create New Employee</button>

                    <button onClick={() => {
                        navigate('/dashboard');
                    }}>View Dashboard</button>

                </div>

            </div>



            {/* View Form */}
            <Dialog open={open} onClose={handleClose}>
                <div className="title">
                <DialogTitle>View Employee Data</DialogTitle>

                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>

                </div>

                    <DialogContentText  className="text">
                        <div>EmpId: {viewData._id}</div>
                        <div>Name: {viewData.fullName?.firstName} {' '} {viewData.fullName?.lastName}</div>
                        <div>Address:{viewData.completeAddress?.addressLine1} {','} {viewData.completeAddress?.addressLine2} {','} {viewData.completeAddress?.city} {','} {viewData.completeAddress?.stateName} {','} {viewData.completeAddress?.country} {','} {viewData.completeAddress?.pincode}</div>
                        <div>Age: {viewData.age}</div>
                        <div>Department: {viewData.department}</div>
                        <div>Status: {viewData.status}</div>
                    </DialogContentText>

                {
                googleApiKey && 

                <StaticGoogleMap size="500x200" className="img-fluid" apiKey={googleApiKey}>
                    <Marker location={location} color="red" label={location}/>
                </StaticGoogleMap>
                }
            </Dialog>



            <div className="body">

            <table>

            <thead>
                <tr>
                    <th className="th__other">EmpId</th>
                    <th className="th__other">Name</th>
                    <th className="th__address">Address</th>
                    <th className="th__other">Age</th>
                    <th className="th__other">Department</th>
                    <th className="th__other">Status</th>
                    <th className="th__button">Actions</th>
                </tr>
            </thead>

            <tbody>

            {
                empData?.map((user) => (
                <tr>
                    <td 
                    onClick={() => {
                    setOpen(true);
                    getEmpData(user._id);
                    }}
                    >{user._id}</td>

                    <td 
                    onClick={() => {
                    setOpen(true);
                    getEmpData(user._id);
                    }}
                    >{user.fullName?.firstName} {' '} {user.fullName?.lastName}</td>

                    <td 
                    onClick={() => {
                    setOpen(true);
                    getEmpData(user._id);
                    }}
                    >{user.completeAddress?.city} {','} {user.completeAddress?.country}</td>

                    <td 
                    onClick={() => {
                    setOpen(true);
                    getEmpData(user._id);
                    }}
                    >{user.age}</td>

                    <td 
                    onClick={() => {
                    setOpen(true);
                    getEmpData(user._id);
                    }}
                    >{user.department}</td>

                    <td 
                    onClick={() => {
                    setOpen(true);
                    getEmpData(user._id);
                    }}
                    >{user.status}</td>

                    <td>

                        <button onClick={() => {
                            navigate(`/update/${user._id}`);
                        }}>Update</button>
                        
                        <button onClick={() => {
                            deleteHandler(user._id);
                        }}>Delete</button>

                    </td>
                </tr>

                ))
            }

            </tbody>

            </table>


            </div>


        </div>
    )
}