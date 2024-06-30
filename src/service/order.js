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

    getByUserId = async (id) => {
        try { 
            const foundOrder = await this.orderRepository.getByUserId(id)
            return this.common.responseToFE(true, 200, foundOrder, null)
        } catch (error) {
            return this.common.responseToFE(false, 503, null, `${error.message}`)
        }
        
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

    updateStatus = async (orderId, status) => {
        try {
            const allStatus = ['IN_CART', 'PAID', 'IN_PROCESS', 'ON_DELIVERY', 'DELIVERED', 'CANCELLED', 'INITIAL']
            if (allStatus.includes(status)) {
                const foundOrder = await this.getById(orderId)
                if (foundOrder) {
                    await this.orderRepository.updateStatus(foundOrder, status)
                    const reFoundOrder = await this.getById(orderId)
                    return this.common.responseToFE(true, 200, reFoundOrder, null)
                } else {
                    throw new Error('excludeOrderId')
                }
            } else {
                throw new Error('excludeStatus')
            }
        } catch (error) {
            if (error.message === 'excludeStatus') {
                const rejectReason = "Wrong status input, should be one of 'IN_CART', 'PAID', 'IN_PROCESS', 'ON_DELIVERY', 'DELIVERED', 'CANCELLED', 'INITIAL'"
                return this.common.responseToFE(false, 403, null, rejectReason)
            } else if (error.message === 'excludeOrderId') {
                return this.common.responseToFE(false, 403, null, `Order ID ${orderId} is invalid`)
            } else {
                return this.common.responseToFE(false, 503, null, `${error.message}`)
            }
        }
    }
}

module.exports = OrderService;