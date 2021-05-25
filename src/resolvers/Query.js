import prisma from "../prisma"
import authenticate from "../utils/Authenticator"

const Query =  {
    me(parent, args , { prisma , request } , info ) {

        const userId = authenticate(request)

        return prisma.query.user({
            where : {
                id : userId
            } 
        })
    },
    async post(parent , args , { prisma , request } , info) {
        const userId = authenticate(request, false)

        const posts = await prisma.query.posts({
            where : {
                id : args.id ,
                OR : [{
                    ispublished : true
                }, {
                    author : {
                        id : userId
                    }
                }]
            }
        } , info)

        if(posts.length === 0){
            throw new Error("post not found")
        }

        return posts[0]
    },
    users(parent, args, { prisma }, info) {

        const opArgs = {
            first : args.first ,
            skip : args.skip,
            after : args.after,
            orderBy : args.orderBy
        }

        if(args.query){
            opArgs.where.OR = [{
                name_contains: args.query
            } ]

        }

        return prisma.query.users(opArgs, info)

    },
    posts(parent, args, { prisma }, info) {

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after : args.after ,
            orderBy : args.orderBy,
            where : {
                ispublished : true
            }
        }

        if(args.query) {
            opArgs.where = {
                OR : [{
                    title_contains : args.query
                },{
                    body_contains : args.query
                }]
            }
        }

        return prisma.query.posts(opArgs , info)
      
    },
    myposts(parent , args , { prisma , request} , info) {
        const userId = authenticate(request)

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy : args.orderBy,
            where : {
                author : {
                    id : userId
                }
            }
        }

        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs , info)
    },
    comments(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy :args.orderBy
        }

        return prisma.query.comments(opArgs , info)
    }
}

export default Query 