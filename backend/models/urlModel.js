// models/urlModel.js
import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

const Urlschema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(4), 
    },
    clicks: {
        type: Number,
        default: 0, 
    },
}, {
    timestamps: true,
});

const Url = mongoose.model('Url', Urlschema);

export default Url;

