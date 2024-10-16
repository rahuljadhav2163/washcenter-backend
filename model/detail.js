import { Schema , model } from "mongoose";

const detailSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "userData", // Update this to match the registered model name
        required: true
    },
    type:{
        type: String,
        required : true
    },
    price:{
        type: String,
        required : true
    },
    model:{
        type :String,
        required : true
    },
    number:{
        type :String,
        required : true
    },
    payment:{
        type :String,
        required : true
    }
},{
    timestamps:true
})

const Detail = model ('Detail' , detailSchema);
export default Detail;
