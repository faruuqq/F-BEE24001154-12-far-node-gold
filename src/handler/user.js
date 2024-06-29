class UserHandler {
    constructor(userService) {
        this.userService = userService
    }

    getAll = async (req, res) => {
        const response = await this.userService.getAll()
        res.status(response.statusCode).send(response.payload)
    }

    register = async (req, res) => {
        const newUser = req.body
        const response = await this.userService.register(newUser)
        res.status(response.statusCode).send(response.payload)
    }

    delete = async (req, res) => {
        const query = req.params.id
        const response = await this.userService.delete(query)
        res.status(response.statusCode).send(response.payload)
    }

    login = async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        const response = await this.userService.login(email, password)
        res.status(response.statusCode).send(response.payload)
    }
}

module.exports = UserHandler;