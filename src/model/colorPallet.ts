import mongoose, { Schema } from 'mongoose';

interface Colors extends Document {
    red: number;
    green: number;
    blue: number;
}

interface ColorPallet extends Document {
    name: string;
    types: string[];
    colors: Colors[];
}

const colorsSchema: Schema<Colors> = new Schema({
    red: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
        default: 0,
    },
    green: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
        default: 0,
    },
    blue: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
        default: 0,
    },
});

const colorPalletSchema: Schema<ColorPallet> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    types: {
        type: [String],
        required: true,
        maxlength: 5,
        default: ['randomPallet'],
    },
    colors: {
        type: [colorsSchema],
        required: true,
        maxLength: 10,
    },
});

const ColorPalletModel =
    (mongoose.models.ColorPallet as mongoose.Model<ColorPallet>) ||
    mongoose.model<ColorPallet>('ColorPallet', colorPalletSchema);

export default ColorPalletModel;
