var bcrypt = require('bcryptjs');
const uuidv4 = require('uuid').v4;

class Common {
    responseToFE = (isSuccess, statusCode, data, errorMessage) => {
        if (isSuccess) {
            return {
                statusCode: statusCode,
                payload: {
                    status: "Success",
                    data: data
                }
            }
        } else {
            return {
                statusCode: statusCode,
                payload: {
                    status: "Failed",
                    error: {
                        message: errorMessage
                    }
                }
            }
        }
    }

    hashPassword = (password) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash
    }

    compareHashPassword = (password, hash) => {
        try {
            const isMatched = bcrypt.compareSync(password, hash);
            return isMatched ? true : false
        } catch (error) {
            return false
        }
        
    }

    generateUUID = () => {
        return uuidv4();
    }
}

module.exports = Common;