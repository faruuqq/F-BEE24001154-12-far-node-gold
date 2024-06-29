// const { Sequelize, DataTypes, Model } = require('sequelize');
const { User } = require('../../models')

class UserRepository {
    register = async (user) => {
        const [addedUser, isAdded] = await User.findOrCreate({
            where: { email: user.email },
            defaults: {
                name: user.name,
                email: user.email,
                password_hash: user.password_hash
            }
        })
        return [addedUser, isAdded];
    }

    getAll = async () => {
        const allUsers = await User.findAll();
        return allUsers;
    }

    delete = async (id) => {
        const deleted = await User.destroy({
            where: { user_id: id }
        });
        return deleted ? true : false
    }

    getByEmail = async (email) => {
        const foundUser = await User.findOne({
            where: { email: email }
        })
        return foundUser
    }

    updateSession = async (user, session) => {
        user.session = session
        await user.save()
    }
}

module.exports = UserRepository;