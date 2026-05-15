import jwt from "jsonwebtoken"

export const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if(!token){
            return res.json({success: false,
                message:"Not Authorizesd"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;

        next();
    } catch (error) {
        console.log(error)
        res.json({success: false , message: error.message})
    }
}