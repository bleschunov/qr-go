import UnauthenticatedError from '../errors/unauthorized.js'

const accessOnlyFor = (str) => (req, res, next) => {
    if (typeof str !== 'string' ) throw new Error('accessOnlyFor принимает только строчку')

    const roles = str.split(' ')

    let isAccess = roles.includes(req.user.access)

    if ( !isAccess && roles.includes('me') ) {
        const queryUserId = req.query?.userId

        if (!queryUserId) throw new Error('userId не распознан')

        isAccess = queryUserId === req.user.userId
    }
    
    if (!isAccess) throw new UnauthenticatedError('У вас не достаточно прав')
    
    next()
}

export default accessOnlyFor