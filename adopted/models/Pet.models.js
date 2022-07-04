const { Schema, model } = require("mongoose");

const petSchema = new Schema(
    {
        name: { type: String, require: true },
        age: { type: Number },
        description: { type: String },
        profileImg: { type: String, default: "https://img.freepik.com/vector-gratis/lindo-perro-marron-avatar_79416-70.jpg" },
        cast: [{ type: Schema.Types.ObjectId, ref: 'Pound' }],
    },
    {
        timestamps: true,
    }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;

PROBANDO RAMA
