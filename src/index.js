import "@babel/polyfill/noConflict"
import { GraphQLServer , PubSub } from "graphql-yoga"
import prisma from "./prisma"
import db from "./db"
import { resolvers , fragmentReplacements } from "./resolvers/index"


const pubsub = new PubSub()

// Type definitions ( schema )


const server = new GraphQLServer({   
    typeDefs: "./src/schema.graphql" ,
    resolvers ,
    context( request ){
        return {
            db,
            pubsub,
            prisma,
            request
        } 
    },
    fragmentReplacements
})

server.start({ port : process.env.PORT || 4000 } , () => {
    console.log("the graphql server is up and running")
})