const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
    res.locals.users = await models.User.findAll({
        attributes: [
            "id",
            "imagePath",
            "username",
            "firstName",
            "lastName",
            "mobile",
            "isAdmin",
        ],
        order: [["createdAt", "DESC"]],
    });
    res.render("user-management");
};

controller.createUser = async (req, res) => {
    let { username, firstName, lastName, mobile, isAdmin } = req.body;

    try {
        await models.User.create({
            username,
            firstName,
            lastName,
            mobile,
            isAdmin: isAdmin ? true : false,
        });

        res.redirect("/users");
    }
    catch (error) {
        res.status(401).send("Failed to create user");
        console.error("Create user error: ", error);
    }
}

controller.updateUser = async (req, res) => {
    let { id, firstName, lastName, mobile, isAdmin } = req.body;

    try {
        await models.User.update({
            firstName,
            lastName,
            mobile,
            isAdmin: isAdmin ? true : false
        }, {
            where: {
                id
            }
        });

        res.send("Updated user");
    }
    catch (error) {
        res.status(401).send("Failed to update user");
        console.log("Update user error: ", error);
    }
}

controller.deleteUser = async (req, res) => {
    let { id } = req.body;

    try {
        await models.User.destroy({
            where: {
                id: parseInt(id)
            },
        });

        res.send("Deleted user");
    }
    catch (error) {
        res.status(401).send("Failed to delete user");
        console.log("Delete user error: ", error);
    }
};

module.exports = controller;