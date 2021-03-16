
const model = require('../models/users.model');
const imageHandler = require('../utils/imageHandler');

const getUsers = async (req, res, next) => {
    try {
        
        const users = await model.readUsers();

        if(users && users.length > 0) {
            res.render('users', { users });
        } else {
            res.render('alta-users');
        }

        
    } catch (error) {
        res.sendStatus(500);
    }
}

const getFormUser = async(req, res, next) => {
    try {
        res.render('alta-users');
    } catch (error) {
        res.sendStatus(500);
    }
}

const createFormUser = async(req, res, next) => {
    try {
        
        const { email, password } = req.body;
        
        const image = imageHandler.saveImage(req.file); // mimetype y filename
        const user = { email, password, image };
        console.log(req.file.originalname);
        const result = await model.createUser(user);
        
        if(result.affectedRows > 0) {
            const users = await model.readUsers();
            res.render('users', { users });
        } else {
            res.render('error');
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getUsers,
    getFormUser,
    createFormUser
}