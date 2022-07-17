const getGoal = (req, res) => {
    res.status(200).json({message: 'Get goals'})
}
const setGoal =  (req, res) => {
    res.status(200).json({message: "Set goals"})
}

const updateGoal = (req, res) => {
    res.status(200).json({message: `Update goals ${req.params.id}`})
}

const deleteGoal = (req, res) => {
    res.status(200).json({message: `Delete goals ${req.params.id}`})
}
module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}