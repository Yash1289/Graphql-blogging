const users = [{
    name: "Yash",
    email: "kalhonaaho@gmail.com",
    id: "1",
    age: 22
}, {
    name: "Kaushik",
    email: "noahkim@gmail.com",
    id: "2"
}, {
    name: "Suhana",
    email: "kinghtandday@gmail.com",
    id: "3"
}]

const posts = [{
    id: "1",
    title: "Five Point Something",
    body: "Interesting book",
    ispublished: true,
    author: "1"
}, {
    id: "2",
    title: "Wings Of Fire",
    body: "AutoBiogrpahy of Apj Abdul Kalam",
    ispublished: true,
    author: "2"
}, {
    id: "3",
    title: "The Great Pandey Story",
    body: "Talks about the highs and lows of Mr Yash",
    ispublished: false,
    author: "2"
}]

const comments = [{
    id: "1",
    text: "It was a really nice story to read ",
    author: "3",
    post: "2"
}, {
    id: "2",
    text: "Loved the book it did inspired me to be like him",
    author: "3",
    post: "3"
}, {
    id: "3",
    text: "I was few of the lucky ones to get this in early sale",
    author: "1",
    post: "2"
}]

const db = {
    users, 
    posts , 
    comments  
}

export default db