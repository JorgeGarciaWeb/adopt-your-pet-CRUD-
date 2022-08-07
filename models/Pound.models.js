const { Schema, model } = require("mongoose")

const poundSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        location: {
            type: { type: String },
            coordinates: [Number]
        }
        
    },
    {
        timestamps: true
    }
)

poundSchema.index({ location: '2dsphere' })

const Pound = model("Pound", poundSchema)

module.exports = Pound