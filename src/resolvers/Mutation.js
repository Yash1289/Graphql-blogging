import bcrypt from "bcryptjs"
import authenticate from  "../utils/Authenticator"
import generateToken from "../utils/generateToken"
import hashPassword from "../utils/hashPassword"

const Mutation ={
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)

        const emailTaken = await prisma.exists.User({ email : args.data.email})

        if (emailTaken) {
            throw new Error("Email is Taken")
        }

        const user = await prisma.mutation.createUser({ 
            data : {
                ...args.data,
                password 
            }
        } )

        return {
            user ,
            token : generateToken(user.id)
        }
    },

     async login( parent, args, { prisma } , info) { 
            
            const user = await prisma.query.user({
                where : {
                    email : args.data.email
                }
            })

            if(!user){
                throw new Error("User not found")
            }
            const isMatch = await bcrypt.compare(args.data.password , user.password)

            if(!isMatch){
                throw new Error("Password is incorrect")
            }
            return {
                user,
                token: generateToken(user.id)
            }
    }, 
 
    async createPost(parent, args, { prisma , request}, info) {

        const userId = authenticate(request)

        return prisma.mutation.createPost({
            data : {
                title : args.post.title,
                body : args.post.body,
                ispublished : args.post.ispublished,
                author: {
                    connect : {
                        id : userId
                    }
                }
            }
        }, info)
        
    },
    async createComment(parent, args, { prisma , request}, info) {

        const userId = authenticate(request)
        const postExist = await prisma.exists.Post({ id : args.comment.post , ispublished : true})
        if ( !postExist) {
            throw new Error("NO such posts exist")
        }

        return prisma.mutation.createComment({
            data : {
                text : args.comment.text ,
                post : {
                    connect : {
                        id : args.comment.post
                    }
                },
                author : {
                    connect: {
                        id : userId
                    }
                }
            }
        }, info)
    
    },
    async updateUser(parent , args, { prisma , request } , info) {

        const userId = authenticate(request)

        if(typeof args.data.password === "string"){
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where : {
                id : userId
            },
            data : args.data
        }, info)
       
    },
    async updatePost(parent , args, { prisma , request }, info){

        const userId = authenticate(request)

        const postExist = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExist) {
            throw new Error("Post not found")
        }

        const postPublished = await prisma.exists.Post({
            id: args.id,
            ispublished : true,
            author: {
                id: userId
            }
        })

        if(postPublished && !args.data.ispublished ){
             await prisma.mutation.deleteManyComments({
                where : {
                    post : {
                        id : args.id
                    }
                }
            })
        }

        return prisma.mutation.updatePost({
            data : args.data,
            where : {
                id : args.id
            }
        } , info)

    },
    async updateComment(parent , args, { prisma , request} , info){

        const userId = authenticate(request)

        const commentExist = await prisma.exists.Comment({ 
            id : args.id,
            author : {
                id : userId
            }
         })
        if (!commentExist) {
            throw new Error("Comment not found")
        }

        return prisma.mutation.updateComment({
            data : args.data,
            where : {
                id : args.id
            }
        }, info)
      
    },
    async deleteUser(parent, args, { prisma , request }, info){

        const userId = authenticate(request)

        return prisma.mutation.deleteUser({
                where : {
                id : userId
            }
        }, info)
      
    } ,
   async deletePost(parent, args, { prisma , request }, info) {
 
       const userId = authenticate(request)

        const postExist = await prisma.exists.Post({ 
            id : args.id , 
            author : {
                id : userId
            }
        })

        if(!postExist) {
            throw new Error("Post not found")
        }

        return prisma.mutation.deletePost({
            where : {
                id : args.id
            }
        } , info)
    },
    async deleteComment(parent, args, { prisma , request }, info) {

        const userId = authenticate(request)

        const commentExist = await prisma.exists.Comment({ 
            id: args.id,
            author : {
                id : userId
            }
         })
        if (!commentExist) {
            throw new Error("Comment not found")
        }

        return prisma.mutation.deleteComment({
            where : {
                id : args.id
            }
        }, info)
        
    }
}

export default Mutation