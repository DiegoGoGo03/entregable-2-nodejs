const catchError = require('../utils/catchError');
const User = require('../models/User');

// Controller to display all users
const getAll = catchError(async(req, res) => {
    const result = await User.findAll() // select * from users;
    return res.json(result/* valor a retornar */) // Return information from json file
});

// Controller to register a new user
const create = catchError(async (req, res) => {
    const result = await User.create(req.body)
    return res.status(201).json(result)
})

// Controller to display a user
const getOne = catchError(async (req, res) => {
    const { id } = req.params
    const result = await User.findByPk(id)
    if(!result) return res.status(404).json("User not found") //Vaidation
    return res.json(result)
})

// Controller to delete a user
const destroy = catchError(async (req, res) => {
    const { id } = req.params
    const result = await User.destroy({ where: { id } }) 
    if (!result) return res.status(404).json("User not found")
    return res.sendStatus(204)
})

// Controller to update a user
const update = catchError(async (req, res) => {
    const { id } = req.params
    const user = await User.update(
        req.body,
        {where: { id }, returning: true}
    )

    if (user[0] === 0) return res.sendStatus(404)
    return res.status(200).json(user[1][0])

})

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}