import jwt from "jsonwebtoken";

export function generateToken(userId){
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
}


export function verifyToken(token){
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }
    catch{
        return null;
    }
}