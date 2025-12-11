import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    productName : { type: String, required: true },
    category : { type: String, required: true },
    brand : { type: String, required: true }, 
    price : { type: Number, required: true }, 
    rating : { type: Number, required: true }, 
    description : { type: String, required: true }, 
    createdAt : { type: String, default: true }
})


export default mongoose.model("Products", productSchema);