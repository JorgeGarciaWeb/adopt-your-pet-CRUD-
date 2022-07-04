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


>>>>>>> 86c1aa21a9a40c329557c8d03966e4c19fb0ccc8
    },
    {
        timestamps: true,
    }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;

