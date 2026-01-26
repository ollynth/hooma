import User from "../models/User.js";

const getUserProfile = async (req, res) => {
    try {
        const userId= req.user._id;
        const user = await User.findById(userId).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error retrieving profile.' });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-passwordHash');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: updatedUser });
        
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: 'Internal server error updating profile.' });
    }
}

export default {getUserProfile, updateUserProfile};