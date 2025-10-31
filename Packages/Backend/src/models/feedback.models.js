import mongoose, { Schema } from "mongoose";


// **Feedback**

// ```json
// {
//   "id": "ObjectId",
//   "fromUser": "ObjectId",
//   "toUser": "ObjectId",
//   "rating": "Number",
//   "comment": "String",
//   "createdAt": "Date"
// }
// ```

const feedbackSchema = new Schema({
    fromUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    toUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    rating : {
        type : Number,
        max : 5,
        min : 0, 
        required: true
    },
    comment : {
        type : String
    }
    
},{ 
        timestamps: true
});

export const  Feedback = mongoose.model("Feedback", feedbackSchema);
