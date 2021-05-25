import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({ userId: id }, "thisisasecret", { expiresIn: '24 hours' })
}

export default generateToken 