

const jwt = require('jsonwebtoken')
const expiry = '100m'
const secret = 'oadhjkalknWOQ79QWHDLKAHDOIQ9874qdLKADKLJASDAJd'

function generatetoken(userid,role) {

    const token = jwt.sign({userid,role} , secret ,{expiresIn: expiry})
    return {token ,role}
}

function tokenvarify(token,callback) {
       jwt.verify(token,secret,(err,tokendata)=>{
            if(err) {
                   
                    callback(err,null)
            }else {
                 callback(null ,tokendata)
                 // console.log('tokendata :',tokendata)
            }

       })
}

module.exports = {generatetoken,tokenvarify}