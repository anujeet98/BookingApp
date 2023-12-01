const User = require('../Model/userModel.js');
const db = require('../util/db.js');

exports.getUsers = (req,res,next) => {
    // console.log('get User hit');
    User.fetchAll()
        .then(result => {
            res.json(result[0]);
        })
        .catch(err => {
            console.error('ReadError-getUser',err);
            // res.status(400).json([]);
        });
};

exports.postUser = (req,res,next) => {
    // console.log('post User hit');
    const user = new User(req.body.name,req.body.phone,req.body.email,req.body.date,req.body.time);
    user.save()
        .then(result => {
            let resJSON = {
                "newUserDetail" : {
                    "id" : result[0].insertId, ...req.body
                }
            }
            
            // console.log(resJSON);
            res.json(resJSON);
        })
        .catch(err => {
            console.error('WriteError-postUser',err);
            // res.status(400).json([]);
        });
};

exports.deleteUser = (req,res,next) => {
    const userId = req.params.id;
    User.deleteuser(userId)
        .then(result => {
            if(result[0].affectedRows == 1)
                res.json({"delete status": "success"});
            else
                res.json({"delete status": "fail"});
        })
        .catch(err => {
            console.error('DeleteError-deleteUser',err);
            // res.status(400).json([]);
        });
};

exports.getUser = (req,res,next) => {
    // console.log('get User hit');
    const userId = req.params.id;
    User.fetchById(userId)
        .then(result => {
            res.json(result[0][0]);
        })
        .catch(err => {
            console.error('ReadError-getUser',err);
            // res.status(400).json([]);
        });
};