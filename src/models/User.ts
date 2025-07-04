import { Schema, model, Document } from "mongoose"

interface IUser extends Document {
    name: string;
    email: string;
    designation?: string; // Optional field for designation
    description?: string; // Optional field for description
    address?: string; // Optional field for address
    phone?: string; // Optional field for phone number
    skills?: string[]; // Optional field for skills
    password: string;
    date: Date;
    role: 'user' | 'Clinic';
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024, //store hashes
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
    ,
    role: {
        type: String,
        enum: ['user', 'Clinic'],
        default: 'user'
    },
    designation: {
        type: String,
        max: 255,
        default: ''
    },
    description: {
        type: String,
        max: 1024,
        default: ''
    },
    address: {
        type: String,
        max: 512,
        default: ''
    },
    phone: {
        type: String,
        max: 15,
        default: ''
    },
    skills: {
        type: [String],
        default: []
    }
})

const User = model<IUser>('User', UserSchema)
export default User;