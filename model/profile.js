import { Schema, model } from "mongoose"

const Uschema = new Schema({
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

const Profile = model('Profile', Uschema);
export default Profile;