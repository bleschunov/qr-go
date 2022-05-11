class BadRequestError extends Error {
    constructor (message) {
        super(message)
        this.name = 'BadRequest'
        this.status = 400
    }
}

export default BadRequestError