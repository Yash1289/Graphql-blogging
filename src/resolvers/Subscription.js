import authenticate from "../utils/Authenticator"

const Subscription = {
    comment : {
        subscribe(parent , { postId } , { prisma } , info){

            return prisma.subscription.comment({
                where : {
                    node : {
                        post : {
                            id : postId
                        }
                    }
                }
            }, info)
        }
    },

    post : {
        subscribe(parent , args , { prisma } , info ){

            return prisma.subscription.post({
                where : {
                    node : {
                        ispublished : true
                    }
                }
            }, info)
        }
    },
    myPost : {
        subscribe(parent , args , { prisma , request } , info) {
            const userId = authenticate(request)

            return prisma.subscription.post({
                where : {
                    node : {
                        author: {
                            id: userId
                        }
                    }  
                }
            }, info ) 
        }
    }
}

export default Subscription