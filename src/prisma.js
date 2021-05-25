import { Prisma } from "prisma-binding"
import { fragmentReplacements } from "./resolvers/index"

const prisma = new Prisma({
    typeDefs : "src/generated/schema.graphql",
    endpoint: process.env.PRISMA_ENDPOINT,
    secret : "chandler" ,
    fragmentReplacements 
})

export default prisma

/* const createPostforUser = async (authorId , data) => {
    
    const authorExist = await prisma.exists.User({ id : authorId})

    if(!authorExist) {
        throw new Error("User not found")
    }

    const Post = await prisma.mutation.createPost({ 
        data : { 
            ...data ,
            author : {
                connect : {
                    id : authorId
                }
            }
        }
    }, '{ author { name , email , posts { id ,title , body } } }')

    return Post.author
}

createPostforUser("ckoy0htug0039088482stkg86" , {
    title : "Harry Potter and the half blood prince",
    body : "The golden trio is finally growind up and feeling the thing called love let's go",
    ispublished : true
}).then((user) => {
    console.log(user)
}).catch((error) => {
    console.log(error.message)
}) 

const updatePostforUser = async ( postId , data ) => { 

    const postExist = await prisma.exists.post({ id : postId })

    if(!postExist) {
        console.log("Post not found")
    }

    const Post = await prisma.mutation.updatePost({
        data : {
            ...data
        },
        where : {
            id : postId
        }
    }, '{ author {name , email , id , posts { id , title , body } } }')

    return Post.author
}

updatePostforUser("ckoy0ik4t003c0884vd459gz8" , {
    title : "Meri life meri marzi mai chahe jo karu mai chahe wo karu",
    ispublished : true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
    console.log(error)
}) 
 */
