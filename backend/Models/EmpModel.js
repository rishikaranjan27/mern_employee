import mongoose from "mongoose";
import crypto from 'crypto';


const empSchema = mongoose.Schema(
    {
        fullName: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },

        completeAddress: {
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            stateName: { type: String, required: true },
            country: { type: String, required: true },
            pincode: { type: Number, required: true },
        },

        mapAddress: {
            address: { type: String, required: true },
            lat: { type: Number },
            lng: { type: Number },
            name: { type: String },
            vicinity: { type: String },
            googleAddressId: { type: String },
        },

        age: { type: Number, required: true },

        department: { type: String, required: true },

        status: { type: String, required: true },


    }, 


    {
        timestamps: true,
    }

);


const Emp = mongoose.model('Emp', empSchema);

export default Emp;

