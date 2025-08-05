import { Request, Response } from 'express';
import Dashboard, { IDashboard } from '../models/Dashboard';
import User from '../models/User';

type DashboardSection = keyof IDashboard;

// Utility function to safely update dashboard sections
const updateDashboardSection = (
  dashboard: IDashboard,
  section: DashboardSection,
  content: string
) => {
  switch (section) {
    case 'Hero':
      dashboard.Hero = content;
      break;
    case 'AboutUs':
      dashboard.AboutUs = content;
      break;
    case 'coreDescription':
      dashboard.coreDescription = content;
      break;
    case 'hiredescription':
      dashboard.hiredescription = content;
      break;
    case 'namedescription':
      dashboard.namedescription = content;
      break;
    case 'conectdescription':
      dashboard.conectdescription = content;
      break;
    default:
      throw new Error(`Invalid section: ${section}`);
  }
};

export const upsertMainComponents = async (req: Request, res: Response) => {
  try {
    const updates = req.body;

    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: "Request body must be an object with section updates" });
    }

    const validSections: DashboardSection[] = [
      'Hero',
      'AboutUs',
      'coreDescription',
      'hiredescription',
      'namedescription',
      'conectdescription'
    ];

    let dashboard = await Dashboard.findOne() || new Dashboard({});

    for (const [section, content] of Object.entries(updates)) {
      if (validSections.includes(section as DashboardSection)) {
        updateDashboardSection(dashboard, section as DashboardSection, content as string);
      }
    }

    await dashboard.save();

    return res.json({
      success: true,
      message: "Sections updated successfully",
      updatedSections: updates
    });

  } catch (error) {
    console.error('Error updating sections:', error);
    return res.status(500).json({ 
      success: false,
      error: error instanceof Error ? error.message : "Failed to update content sections"
    });
  }
};

// Keep all your existing user-related controllers
export const getTotalUserCount = async (req: Request, res: Response) => {
    try {
        const count = await User.countDocuments();
        res.json({ totalUsers: count });
    } catch (error) {
        res.status(500).json({ error: "Failed to get user count" });
    }
};

export const getAllClinics = async (req: Request, res: Response) => {
    try {
        const clinics = await User.find({ role: "Clinic" });
        res.json({ clinics });
    } catch (error) {
        res.status(500).json({ error: "Failed to get clinics" });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ role: "user" });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: "Failed to get users" });
    }
};

export const getLatestThreeUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).limit(3);
        res.json({ latestUsers: users });
    } catch (error) {
        res.status(500).json({ error: "Failed to get latest users" });
    }
};

export const getMainComponents = async (req: Request, res: Response) => {
    try {
        const dashboard = await Dashboard.findOne();

        const defaultSections: IDashboard = {
            Hero: '',
            AboutUs: '',
            coreDescription: '',
            hiredescription: '',
            namedescription: '',
            conectdescription: '',
            _id: '' as any, // Temporary fix for TypeScript
            __v: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        if (!dashboard) {
            return res.json(defaultSections);
        }

        res.json({
            Hero: dashboard.Hero || '',
            AboutUs: dashboard.AboutUs || '',
            coreDescription: dashboard.coreDescription || '',
            hiredescription: dashboard.hiredescription || '',
            namedescription: dashboard.namedescription || '',
            conectdescription: dashboard.conectdescription || ''
        });

    } catch (error) {
        console.error('Error getting sections:', error);
        res.status(500).json({ 
            success: false,
            error: "Failed to get content sections" 
        });
    }
};