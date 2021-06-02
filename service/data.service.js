const db = require('./db');

//let currentUser;

let accountDetails = {
  1000: { acno: 1000, username: "userone", password: "userone", balance: 50000 },
  1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
  1002: { acno: 1002, username: "userthree", password: "userthree", balance: 10000 },
  1003: { acno: 1003, username: "userfour", password: "userfour", balance: 6000 }
}
const register = (uname, acno, pswd) => {
  return db.User.findOne({ acno })
    .then(user => {

      //console.log(user);
      if (user) {

        return {
          statusCode: 422,
          status: false,
          message: "User exists,please login"
        }
      }
      else {
        const newUser = new db.User({
          acno,
          username: uname,
          password: pswd,
          balance: 0
        })

        newUser.save();//databaseil save aavan
        return {
          statusCode: 200,
          status: true,
          message: "Successfully reigsterd"
        }

      }

    })
  
}
const login = (req, acno, password) => {
var acno=parseInt(acno);
  return db.User.findOne({ acno,password })
    .then(user => {
      if(user)
      {

        req.session.currentUser = user;
        return {
          statusCode: 200,
          status: true,
          message: "Succesfuly login",
          name:user.username
        }
  
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "invld credentials"
        }
      }
    })
  }
  // let user = accountDetails;
  // if (acno in user) {

  //   if (pswd == user[acno]["password"]) {
  //     req.session.currentUser = user[acno]
  //     return {
  //       statusCode: 200,
  //       status: true,
  //       message: "Succesfuly login"
  //     }

  //   }

  //   else {
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "invld pswd"
  //     }
  //   }
  // }
  // else {
  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "invalid acnt"
  //   }
  // }

const deposit = (acno, password, amt) => {


  var amount = parseInt(amt);
  //let user = accountDetails;
  return db.User.findOne({ acno,password })
  .then(user => {
    if(!user)
    {
      return {
        statusCode: 422,
        status: false,
        message: "invalid acnt"
      }
    }
    
user.balance+=amount;
user.save();
return {
  statusCode: 200,
  status: true,
  balance: user.balance,
  message:  amount + "credited and new blnce is " + user.balance
}
    
    
  
  })
}

//      
//   if (acno in user) {
//     if (pswd == user[acno]["password"]) {
//       user[acno]["balance"] += amount;
//       return {
//         statusCode: 200,
//         status: true,
//         balance: user[acno]["balance"],
//         message: amount + "crdtd and new blnce is " + user[acno]["balance"]
//       }
//     }
//     else {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "incrct pswd"
//       }
//     }
//   }

//   else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "invalid acnt"
//     }
//   }

const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno,password })
  .then(user => {
    if(!user)
    {
      return {
        statusCode: 422,
        status: false,
        message: "invalid acnt"
      }
    }
    if(user.balance<=amount)
    {
      return{
        statusCode: 422,
        status: false,
        message: "insufficient balance"
      }
    }
user.balance-=amount;
user.save();
return {
  statusCode: 200,
  status: true,
  balance: user.balance,
  message:  amount + "debited and new blnce is " + user.balance
}
    
    
  
  })
}
  //let user = accountDetails;
  // if (acno in user) {
  //   if (pswd == user[acno]["password"]) {
  //     user[acno]["balance"] -= amount;
  //     return {
  //       statusCode: 200,
  //       status: true,
  //       balance: user[acno]["balance"],
  //       message: amount + "debited and new blnce is " + user[acno]["balance"]
  //     }
  //   }
  //   else {
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "incrct pswd"
  //     }
  //   }
  // }

  // else {
  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "invalid acnt"
  //   }
  // }


module.exports = {
  register,
  login,
  deposit,
  withdraw
}