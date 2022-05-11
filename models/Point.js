import mongoose from 'mongoose'

const PointSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: ''
    },
    location: {
        lat: {
            type: Number,
            required: [true, 'Заполните широту'],
            trim: true
        },
        lng: {
            type: Number,
            required: [true, 'Заполните долготу'],
            trim: true
        }
    },
    code: {
        type: String,
        required: [true, 'Код обязателен'],
        unique: [true, 'Такой код уже существует']
    }
})

PointSchema.methods.format = function() {
    this.code = undefined
}

const Point = mongoose.model('Point', PointSchema)

export default Point