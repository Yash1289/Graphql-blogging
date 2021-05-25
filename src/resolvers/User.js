import authenticate from "../utils/Authenticator"

const User = {
   email: {
       fragment : "fragment userId on User { id }" ,
        resolve(parent, args, { request }, info) {
            const userId = authenticate(request, false)

            if (userId && userId === parent.id) {
                return parent.email
            } else {
                return null
            }
        }
   },
   posts : {
       fragment: "fragment userId on User { id } " ,
       async resolve(parent , args , { prisma } , info){
           const posts = await prisma.query.posts({
               where : {
                   author : {
                    id : parent.id
                   },
                    ispublished : true
               }
           })
           return posts
       }
   }
}

export default User 