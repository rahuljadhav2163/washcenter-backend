import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from "./model/userData.js";
import Detail from "./model/detail.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

try {
    const MongoDBConn = async () => {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        if (conn) {
            console.log('MongoDB connected')
        }
    };
    MongoDBConn();
} catch (e) {
    console.log(e.message)
}

app.get('/', (req, res) => {
    res.send('server is running')
})
// user register

app.post('/api/register', async (req, res) => {
    const { name, mobile, password } = req.body;
    try {
        const newUser = new User({
            name, mobile, password
        })
        const saveUser = await newUser.save();
        res.json({
            success: true,
            data: saveUser,
            message: "Signup successfully..!"
        }
        )
    } catch (e) {
        res.json({
            success: "false",
            message: e.message
        })
    }
})

//user login

app.post('/api/login', async (req, res) => {
    const { mobile, password } = req.body;
    const findUser = await User.findOne({ password, mobile }).select('name mobile')

    if (findUser == null) {
        return res.json({
            success: "false",
            message: "Something went wrong..!"
        }
        )
    }
    res.json({
        success: "true",
        data: findUser,
        message: "login successfully..!"
    }
    )
})

// post data

app.post('/api/addVehicle', async (req, res) => {
    const { user, type, price, model, number, payment } = req.body;

    const transaction = new Detail({
        user, type, price, model, number, payment
    })
    try {
        const savedData = await transaction.save();
        return res.json({
            success: true,
            data: savedData,
            message: 'transaction successfull'
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
});

// get data

app.get('/api/getVehicles/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const findTransaction = await Detail.find({ user: id }).populate('user');
        
        
        res.json({
            success: true,
            data: findTransaction,
            message: "Vehicle fetched successfully!"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// delete entry

app.delete('/api/delentry/:id', async (req, res) => {
    const { id } = req.params;

    await Detail.deleteOne({ _id: id })

    res.json({
        success: "true",
        message: "Entry delete succesfully..!"
    })
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});