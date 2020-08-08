const jwt = require('jsonwebtoken');
const JWTTOKEN = 'akddlfadjfdsakdflda';
module.exports = (req,res,next)=>{
    const {authorization}= req.headers;
    if(!authorization){
        return res.status(401).json({error:"You are not authorised"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWTTOKEN,(err,payload)=>{
        if(err)
            return res.status(401).json({error:"You are not authorised"});
        next();
    })
}