import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

})

const Team = mongoose.model('Team', teamSchema)

export default Team