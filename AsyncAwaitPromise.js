const user = {
    name: "Anujeet",
    posts: ["Post abc", "Post cdf", "Post xyz"],
    lastUserActTime: Date()
}

//console.log(user);


const postAsyncPromises = async () => {

    const createPost = new Promise((resolve, reject)=>{
        console.log("Before Creating Posts "+ (user.posts.length+1) + ", user lastActivityTime = "+user.lastUserActTime);
        user.posts.push("New Post "+ (user.posts.length+1));
        resolve("After creating post "+(user.posts.length)+" >>>>>>>");
    });

    const updateLastUserActivityTime = new Promise((resolve,reject)=>{
        console.log("posts >>> "+user.posts);
        setTimeout(()=>{
            user.lastUserActTime = Date();
            resolve("user last activity time "+Date.now());
        },1000);
    });

    const deletePost = new Promise((resolve,reject)=> {
        user.posts.pop();
        resolve();
    });


    let [create, updateActTime] = await Promise.all([createPost,updateLastUserActivityTime]);

    let delPost = await deletePost;

    console.log(create);

    console.log(updateActTime);

}

postAsyncPromises().then(()=>{
    user.posts.forEach(posts => {
        console.log(posts);
    })
})


