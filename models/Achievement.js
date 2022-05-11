import mongoose from 'mongoose'


const AchievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Название обязательно'],
        trim: true
    },
    descr: {
        type: String,
        default: '',
        trim: true
    },
    thumbnail: {
        type: String,
        default: 'default.png'
    }
})

const Achievement = mongoose.model('Achievement', AchievementSchema)

export default Achievement