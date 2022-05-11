import NotFoundError from '../errors/notFound.js'

const notFoundMiddleware = () => {
    throw new NotFoundError('This route does not exist')
}

export default notFoundMiddleware