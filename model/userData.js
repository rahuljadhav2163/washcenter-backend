import { Schema, model } from "mongoose"

const Userschema = new Schema({
    name: {
        type: "String",
        default: "-"
    },
    mobile: {
        type: "String",
        unique: true
    },
    password: {
        type: "String",
        required: true,
    },
}
)

const User = model('userData', Userschema);
export default User;