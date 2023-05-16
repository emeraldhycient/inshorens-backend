const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const signAccessToken = (payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ payload }, accessTokenSecret, {
        }, (err: unknown, token: string) => {
            if (err) {
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

const verifyAccessToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
            if (err) {
                const message = err?.name == 'JsonWebTokenError' ? 'Unauthorized' : err?.message
                return reject(createError.Unauthorized(message))
            }
            resolve(payload)
        })
    })
}


export {
    signAccessToken,
    verifyAccessToken
}