class OrderHandler {
    constructor(orderService) {
        this.orderService = orderService
    }

    delete = async (req, res) => {
        const query = req.params.id
        const response = await this.orderService.delete(query)
        res.status(response.statusCode).send(response.payload)
    }
}

module.exports = OrderHandler;