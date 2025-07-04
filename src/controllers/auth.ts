import { Response, Request } from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

type RequestBody = {
    name: string;
    email: string;
    password: string;
    designation?: string;
    description?: string;
    address?: string;
    phone?: string;
    skills?: string[];
    role?: 'user' | 'Clinic';
}

export const registerUser = async (req: Request, res: Response) => {
    const { 
        name, 
        email, 
        password,
        designation = '',
        description = '',
        address = '',
        phone = '',
        skills = [],
        role = 'user'
    }: RequestBody = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with all fields
        const user = new User({
            name,
            email,
            password: hashedPassword,
            designation,
            description,
            address,
            phone,
            skills: Array.isArray(skills) ? skills : [skills].filter(Boolean),
            role
        });

        await user.save();

        // Return success without sensitive data
        res.status(201).json({ 
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
}



export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create non-expiring token using email
        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET!
                   );

        // Return user data and token
        res.status(200).json({
            success: true,
            token,
            user: {
                id:user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                designation: user.designation || 'User'
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      
       
        // Get all users excluding sensitive data
        const users = await User.find()
            .select('-password -__v')
            .lean();

        // Transform data if needed
        const sanitizedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            designation: user.designation || '',
            address: user.address || '',
            phone: user.phone || '',
            skills: user.skills || [],
            description: user.description || '',
        }));

        res.status(200).json({
            success: true,
            count: users.length,
            users: sanitizedUsers
        });

    } catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users'
        });
    }
};