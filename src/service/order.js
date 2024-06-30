class OrderService {
    constructor(orderRepository, common) {
        this.orderRepository = orderRepository
        this.common = common
    }

    add = async (order) => {
        const newOrder = await this.orderRepository.add(order)
        return newOrder
    }

    getById = async (id) => {
        const foundOrder = await this.orderRepository.getById(id)
        return foundOrder
    }

    delete = async (id) => {
        try {
            const isDeleted = this.orderRepository.delete(id)
            if (isDeleted) {
                return this.common.responseToFE(true, 200, { status: 'Success deleted' }, null)
            } else {
                return this.common.responseToFE(false, 403, null, 'Failed to delete')
            }
        } catch (error) {
            return this.common.responseToFE(false, 503, null, `${error.message}`)
        }
    }
}

module.exports = OrderService;