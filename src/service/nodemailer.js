class NodemailerService {
    constructor(nodemailerRepository, common) {
        this.nodemailerRepository = nodemailerRepository
        this.common = common
    }

    sendEmail = async () => {
        try {
            const info = await this.nodemailerRepository.sendEmail()
            return this.common.responseToFE(true, 200, info, null)
        } catch (error) {
            return this.common.responseToFE(false, 503, null, `${error.message}`)
        }
    }
}

module.exports = NodemailerService;