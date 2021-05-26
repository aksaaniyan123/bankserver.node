accountDetails = {
    1000: { acno: 1000, username: "userone", password: "userone", balance: 50000 },
    1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
    1002: { acno: 1002, username: "userthree", password: "userthree", balance: 10000 },
    1003: { acno: 1003, username: "userfour", password: "userfour", balance: 6000 }
}
const register = (uname, acno, pswd) => {
    let user = accountDetails;
    if (acno in user) {
        return {
            statuscode:422,
            status: false,
            message: "user exist plz login"
        }
    }
    else {
        user[acno] = {
            acno,
            username: uname,
            password: pswd,
            balance: 0
        }

        return {
            statuscode:200,
            status: true,
            message: "successfully registered"
        }
    }
}
const login = (acno, pswd) => {
    let users = accountDetails;
    if (acno in users) {
        if (pswd == users[acno]["password"]) {
            currentUser = users[acno]["username"]

            return {
                statuscode: 200,
                status: true,
                message: "sucessfully login"
            }
        }

        else {
            return {
                statuscode: 422,
                status: false,
                message: "invalid password"
            }
        }
    }

    else {
        return{
        statusCode: 422,
            status: false,
                message: "invalid account"
    }
}
}
module.exports = {
    register,
    login
}