import Achievement from "../models/Achievement.js"

const getAllAchievements = async (req, res) => {
    const achievements = await Achievement.find({})

    res.status(200).json({ count: achievements.length, achievements })
}

export default getAllAchievements