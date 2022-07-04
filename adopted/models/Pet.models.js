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

>>>>>>> 882574f35bdbe5b88f8da314b95a61566ecb77a3
    },
    {
        timestamps: true,
    }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;

