import jwt from "jsonwebtoken"

const authenticate = (request , requireAuth = true) => {
    const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization 
    

    if(header) {
        const token = header.replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.userId
    }
    if(requireAuth) {
        throw new Error("You need to login to do that")
    }

    return null
}

export default authenticate