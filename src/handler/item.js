class ItemHandler {
    constructor(itemService) {
        this.itemService = itemService
    }

    getAll = async (req, res) => {
        const response = await this.itemService.getAll()
        res.status(response.statusCode).send(response.payload)
    }

    add = async (req, res) => {
        const bodyRequest = req.body
        const response = await this.itemService.add(bodyRequest)
        res.status(response.statusCode).send(response.payload)
    }

    getById = async (req, res) => {
        const query = req.query.id
        const response = await this.itemService.getById(query)
        res.status(response.statusCode).send(response.payload)
    }

    delete = async (req, res) => {
        const query = req.params.id
        const response = await this.itemService.delete(query)
        res.status(response.statusCode).send(response.payload)
    }
}

module.exports = ItemHandler;