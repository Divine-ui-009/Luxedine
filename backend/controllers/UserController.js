const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (error){
        res.status(500).json({
            message: "Registration filed: " + error.message,
        });
    }
};

//Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid user account",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password );
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role,},
            process.env.JWT_SECRET,
            { expiresIn: "7d",}
        ); 

        res.status(200).json({
            message: "Login succesfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Login failed: "+ error.message,
        });
    }
};

//Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User profile retrieved successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })

    } catch (err){
        res.status(500).json({
            message: "Failed to get user profile: " + err.message,
        })
    }
}


//Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");

        if(!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });

    } catch (err){
        res.status(500).json({
            message: "User update failed: " + err.message,

        });
    }
};

//Delete User
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "user not found",
            })  
        }

        res.status(200).json({
            message: "User deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            message: "User deletion failed: " + err.message,
        });
    }
}