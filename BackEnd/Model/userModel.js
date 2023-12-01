const db = require('../util/db.js');

module.exports = class user{
    constructor(name, phone, email, date, time){
        this.name=name;
        this.phone = phone;
        this.email=email;
        this.date=date;
        this.time=time;
    };

    save(){
        return db.execute('INSERT INTO user(name,phone,email,date,time) VALUES(?,?,?,?,?)', [this.name,this.phone,this.email,this.date,this.time]);
    }

    static fetchAll(){
        return db.execute('SELECT * FROM user');
    }

    static deleteuser(id){
        return db.execute('DELETE FROM user WHERE id=?',[id]);
    }

    static fetchById(id){
        return db.execute('SELECT * FROM user WHERE id=?',[id]);
    }
}