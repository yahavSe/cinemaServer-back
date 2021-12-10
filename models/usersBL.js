var users = require('./usersSchema')
const jfile = require('jsonfile');

var getALL = async () => {
    return new Promise((resolve, reject) => {
        users.find({}, async (err, data) => {
            if (err) {
                reject(err)
            }
            else {

                resolve(data)
            }
        })
    })
}
var getAllJson = () => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}
var getAllJsonPer = () => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./Permissions.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

var getById = (id) => {
    return new Promise((resolve, reject) => {
        users.findById(id, async (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                var arrData = []
                var dataJson = await getUserByIDJson(id)
                var dataPermissions = await getPermissionsByIDJson(id)
                arrData.push(data)
                arrData.push(dataJson[0])
                arrData.push(dataPermissions[0])
                resolve(arrData)
            }
        })
    })
}

var getUserByIDJson = (id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var returnID = data.filter(item => item.id == id);
                resolve(returnID);
            }
        })
    })
}
var getPermissionsByIDJson = (id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./Permissions.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var returnID = data.filter(item => item.id == id);
                resolve(returnID);
            }
        })
    })
}

var addUsers = (user) => {
    let prom = new Promise((resolve, reject) => {
        var newUser = new users({
            userName: user[0].userName,
            password: user[0].password
        })
        newUser.save((err, userId) => {
            if (err) {
                reject(err)
            }
            else {
                insertUser(user[1], userId._id)
                insertUserProm(user[2], userId._id)
                resolve("The User has been created")
            }
        })
    })
    return prom;
}
var insertUser = (user, id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data.push({ id, ...user })
                jfile.writeFile('./users.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log("sucses!!!");
                    }
                })
            }
        })
    })
}
var insertUserProm = (user, id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./Permissions.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data.push({ id, ...user })
                jfile.writeFile('./Permissions.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log("sucses!!!");
                    }
                })
            }
        })
    })
}

var updateUsers = (user, id) => {
    console.log(user);
    return new Promise((resolve, reject) => {
        users.findByIdAndUpdate(id, {
            userName: user[0].userName,
            password: user[0].password
        }, (err) => {
            if (err) {
                reject(err)
            }
            else {
                updateUser(user[1], id)
                updateUserProm(user[2], id)
                resolve("The User has been updated")
            }
        })

    })
}
var updateUser = (user, id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex(item => item.id == id);
                data[index] = { id, ...user }
                jfile.writeFile('./users.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log("sucses updating!!!");
                    }
                })
            }
        })
    })
}
var updateUserProm = (user, id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./Permissions.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex(item => item.id == id);
                data[index] = ({ id, ...user })
                jfile.writeFile('./Permissions.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log("sucses updating!!!");
                    }
                })
            }
        })
    })
}

var deleteUsers = (id) => {
    return new Promise((resolve, reject) => {
        users.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                deleteUser(id)
                deleteUserProm(id)
                resolve("Deleted!!!")
            }
        })
    })
}
var deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex(item => item.id == id);
                data.splice(index, 1);
                jfile.writeFile('./users.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log("sucses deleting!!!");
                    }
                })

            }
        })
    })
}
var deleteUserProm = (id) => {
    return new Promise((resolve, reject) => {
        jfile.readFile('./Permissions.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex(item => item.id == id);
                data.splice(index, 1);
                jfile.writeFile('./Permissions.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log("sucses deleting!!!");
                    }
                })

            }
        })
    })
}

module.exports = { getALL, getById, addUsers, updateUsers, deleteUsers, getAllJson, getUserByIDJson }