const jwt=require('jsonwebtoken')
//middleware function to protect routes
const protect=async(req,res,next)=>{
    try{
        //get the token from request headers and split to get token
      const token=req.headers["authorization"].split(" ")[1]
      //verify the token using secrect key
      jwt.verify(token,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",(err,decode)=>{
        if(err)
        {
            return res.status(200).send({
                message:"server failed",
                success:false,
            })
        }
        else{
            //If verification is successful,add the decoded user ID to the request body
            req.body.userId=decode.id;
            next()//to call the next middleware
        }
      })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Auth error',
        })
    }
}
module.exports=protect;