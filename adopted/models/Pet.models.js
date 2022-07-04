const { Schema, model } = require("mongoose");

const petSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        birth: { type: Date },
        description: { type: String },
        avatar: {
            type: String,
            default: "https://img.freepik.com/vector-gratis/lindo-perro-marron-avatar_79416-70.jpg"
        },
        cast: {
            type: Schema.Types.ObjectId,
            ref: 'Pound'
        },
<<<<<<< HEAD
        owner:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    
=======
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

>>>>>>> f5c0b42ab9b81a722ca89a1b2e482890e441d366
    },
    {
        timestamps: true,
    }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;

