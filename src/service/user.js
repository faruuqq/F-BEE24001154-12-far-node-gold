class UserService {
    constructor(userRepository, common) {
        this.userRepository = userRepository;
        this.common = common
    }

    getAll = async () => {
        try {
            let allUsers = await this.userRepository.getAll()
            var users = []
            allUsers.forEach(element => {
                const user = this.#filterToFE(element)
                users.push(user)
            });
            return this.common.responseToFE(true, 200, users, null);
        } catch (error) {
            return this.common.responseToFE(false, 502, null, `${error}`)
        }
    }

    register = async (user) => {
        try {
            const newUser = this.#editNewUser(user);
            const [addedUser, isAdded] = await this.userRepository.register(newUser)
            const modifiedUser = this.#filterToFE(addedUser)
            if (isAdded) {
                return this.common.responseToFE(true, 200, modifiedUser, null);
            } else {
                return this.common.responseToFE(false, 403, null, `${user.email} already existed`)
            }
        } catch (error) {
            return this.common.responseToFE(false, 502, null, `${error}`)
        }
    }

    delete = async (id) => {
        try {
            const deleted = await this.userRepository.delete(id)
            if (deleted) {
                return this.common.responseToFE(true, 204, { deleted: "success" }, null);
            } else {
                return this.common.responseToFE(false, 403, null, "No ID matched")
            }
        } catch (error) {
            return this.common.responseToFE(false, 502, null, `${error}`)
        }
    }

    login = async (email, password) => {
        const foundUser = await this.#getByEmail(email)
        if (foundUser) {
            const hash = foundUser.password_hash
            const isMatched = this.common.compareHashPassword(password, hash)
            if (isMatched) {
                const uuid = this.common.generateUUID()
                await this.userRepository.updateSession(foundUser, uuid)
                return this.common.responseToFE(true, 200, { session: uuid }, null)
            } else {
                return this.common.responseToFE(false, 403, null, `Password does not match with ${email}`)
            }
        } else {
            return this.common.responseToFE(false, 403, null, `No account for ${email}`)
        }
    }

    #getByEmail = async (email) => {
        const foundUser = await this.userRepository.getByEmail(email)
        return foundUser
    }

    #editNewUser = (user) => {
        const userHashedPassword = this.common.hashPassword(user.password)
        const newUser = {
            name: user.name,
            email: user.email,
            password_hash: userHashedPassword
        }
        return newUser
    }

    #filterToFE = (user) => {
        return {
            id: user.user_id,
            name: user.name,
            email: user.email
        }
    }
}

module.exports = UserService;