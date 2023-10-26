const user = {
    name: "Anujeet",
    posts: ["Post abc", "Post cdf", "Post xyz"],
    lastUserActTime: Date()
}

//console.log(user);



function createPost(){
    return new Promise((resolve, reject)=>{
        console.log("Before Creating Posts "+ (user.posts.length+1) + ", user lastActivityTime = "+user.lastUserActTime);
        user.posts.push("New Post "+ (user.posts.length+1));
        resolve("After creating post "+(user.posts.length)+" >>>>>>>");
    })
}

function updateLastUserActivityTime(){
    return new Promise((resolve,reject)=>{
        console.log("posts >>> "+user.posts);
        setTimeout(()=>{
            user.lastUserActTime = Date();
            resolve("user last activity time "+Date.now());
        },1000);
    })
}

function deletePost(){
    return new Promise((resolve,reject)=> {
        user.posts.pop();
        resolve();
    })
}

Promise.all([createPost(),updateLastUserActivityTime()]).then((values) => {
    values.forEach(v => {
        console.log(v);
    })
    // console.log(values);
    deletePost().then(()=>{
        user.posts.forEach(posts => {
            console.log(posts);
        })
    })
});


// createPost().then((msg)=>{
//     console.log(msg);
//     updateLastUserActivityTime((msg)=>{
//         console.log(msg);
//     });
// })