import { UserAuth } from "../model/userAuth.js";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;
    const salt = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        const createUser = await UserAuth({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
        })
        await createUser.save();
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Login User
export const loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const loggedUser = await UserAuth.findOne({ email });
        if (!loggedUser) return res.status(404).json({ message: "email is incorrect" });
        const passMatch = await bcrypt.compare(password, loggedUser.password);
        if (!passMatch) {
            res.status(401).json({ message: "Password is incorrect" });
        }
        if (role !== loggedUser.role) {
            return res.status(401).json({ message: "Role is incorrect" });
        }
        const tokenPayload = {
            id: loggedUser._id,
            firstname : loggedUser.firstname,
            lastname : loggedUser.lastname,
            email: loggedUser.email,
            role: loggedUser.role,
        };
        const token = JWT.sign(tokenPayload, process.env.JWT_SEC_KEY, { expiresIn: '2 days' });
        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: false,
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                firstname: loggedUser.firstname,
                lastname: loggedUser.lastname,
                email: loggedUser.email,
                role: loggedUser.role,
            },
        });

    } catch (error) {
        console.log(error);

    }
}

// logout 

export const logoutUser = async(req , res) => {
    const token = req.cookies.jwtToken
    try {
        if(token){
            res.clearCookie("jwtToken");
            res.status(200).json({message :  "user successfully logout"})
        }
    } catch (error) {
        console.log("error" , error.message)
    }
}
// check-auth 

export const checkAuth = async(req , res) => {
    const token = req.cookies.jwtToken;

    if(!token) return res.status(401).json({ isAuthenticated: false });

    try {
        const decode = JWT.verify(token , process.env.JWT_SEC_KEY);
        res.status(200).json({
            isAuthenticated : true,
            role : decode.role,
            user : decode,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({isAuthenticated : false})
    }
}

