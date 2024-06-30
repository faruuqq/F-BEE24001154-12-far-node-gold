class UserService {
    constructor(userRepository, common, itemService, orderService) {
        this.userRepository = userRepository;
        this.common = common
        this.itemService = itemService
        this.orderService = orderService
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
            return this.common.responseToFE(false, 502, null, `${error.message}`)
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
            return this.common.responseToFE(false, 502, null, `${error.message}`)
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
            return this.common.responseToFE(false, 502, null, `${error.message}`)
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

    logout = async (email) => {
        const foundUser = await this.#getByEmail(email)
        if (foundUser) {
            if (foundUser.session && foundUser.session !== '') {
                await this.userRepository.updateSession(foundUser, null)
                return this.common.responseToFE(true, 200, { message: "Success Log out" }, null)
            } else {
                return this.common.responseToFE(false, 403, null, `No session for ${email}`)
            }
        } else {
            return this.common.responseToFE(false, 403, null, `No session for ${email}`)
        }
    }

    makeOrder = async (session, itemId) => {
        try {
            const foundUser = await this.#getBySession(session)
            if (foundUser)  {
                const foundItem = await this.itemService.getByIdRaw(itemId)
                if (foundItem) {
                    const newOrder = {
                        item_id: foundItem.item_id,
                        user_id: foundUser.user_id,
                        status: 'IN_CART'
                    }
                    const addedOrder = await this.orderService.add(newOrder)
                    const completeOrder = await this.orderService.getById(addedOrder.order_id)
                    return this.common.responseToFE(true, 200, completeOrder, null)
                }
    
            } else {
                throw new Error('Unauthorized')
            }
        } catch (error) {
            return this.common.responseToFE(false, 401, null, `${error.message}`)
        }
        
    }

    #getByEmail = async (email) => {
        const foundUser = await this.userRepository.getByEmail(email)
        return foundUser
    }

    #getBySession = async (session) => {
        const foundUser = await this.userRepository.getBySession(session)
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