const errorHandlerMiddleware = (err, req, res, next) => {
    const error = {
        name: err.name,
        msg: err.message || 'На сервере что-то пошло не так',
        status: err.status || 500,
        stack: err.stack
    }

    const { status, msg, stack, name } = error

    res.status(status).json({ error: { name, msg, stack }})
}

export default errorHandlerMiddleware