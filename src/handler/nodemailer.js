class NodemailerHandler {
    constructor(nodemailerService) {
        this.nodemailerService = nodemailerService
    }

    sendEmail = async (req, res) => {
        const response = await this.nodemailerService.sendEmail()
        res.status(response.statusCode).send(response.payload)
    }
}

module.exports = NodemailerHandler;