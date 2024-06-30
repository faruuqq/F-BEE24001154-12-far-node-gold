class OrderHandler {
    constructor(orderService) {
        this.orderService = orderService
    }

    delete = async (req, res) => {
        const query = req.params.id
        const response = await this.orderService.delete(query)
        res.status(response.statusCode).send(response.payload)
    }

    getByUserId = async (req, res) => {
        const query = req.query.id
        const response = await this.orderService.getByUserId(query)
        res.status(response.statusCode).send(response.payload)
    }

    updateStatus = async (req, res) => {
        const orderId = req.body.order_id
        const status = req.body.status
        const response = await this.orderService.updateStatus(orderId, status)
        res.status(response.statusCode).send(response.payload)
    }
}

module.exports = OrderHandler;