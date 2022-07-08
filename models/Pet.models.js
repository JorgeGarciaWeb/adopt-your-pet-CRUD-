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
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;

