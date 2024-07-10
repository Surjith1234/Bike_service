const User=require('../model/User')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");


        const register = async (req, res) => {
            try {
              console.log(req.body);
              //find the user if already a user is axist
              const existingUser = await User.findOne({ email: req.body.email });
              //if exist
              if (existingUser) {
                return res.status(500).send({ message: "Already registered", success: false });
              }
          
              const password = req.body.password;

              const salt = await bcrypt.genSalt(10);
            
          
              if (!password || !salt) {
                return res.status(400).send({ message: "Password or salt is missing", success: false });
              }
          
              const hashPassword = await bcrypt.hash(password, salt);//to convert the password to hash values
              req.body.password = hashPassword;
          
              const confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);//to convert the confirmpassword to hash values
              req.body.confirmPassword = confirmPassword;
          //check if password and confirm password is equal or not if equal to store the values in database
              if (req.body.password === req.body.confirmPassword) {
                const user = await User.create(req.body);
                const token = jwt.sign({ id: user._id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", { expiresIn: "1d" });//TO sign the tokens and it expires in 1day
                if (user) {
                  return res.status(200).send({ success: true, message: "Registered Successfully", data: { user, token } });
                }
              } else {//password not match
                return res.status(500).send({ success: false, message: "Passwords do not match" });
              }
            } catch (error) {
              console.error("Error during registration:", error);
              return res.status(500).send({ success: false, message: "Error during registration" });
            }
          };
          

const login=async(req,res)=>{
   console.log(req.body)
    try{
        //find the user in database
        const findUser=await User.findOne({email:req.body.email})
        //if not find the user
        if(!findUser)
            {
               return res.status(500).send({success:false,message:"user not found"})
            }
            const isMatch = await bcrypt.compare(req.body.password, findUser.password);//to compare the password is match or not
            if (!isMatch) {//if not match 
                console.log("user not found")
                return res.status(200).send({
                    message: "Invalid password and mail",
                    success: false,
                });
            }
            const token = jwt.sign({ id: findUser._id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
                expiresIn: "1d",
            });//TO sign the tokens and it expires in 1day
           return res.status(200).send({success:true,message:"login successfully",data:{
                findUser,token
            }})
    }
    catch(err)
    {
        res.status(500).send({success:false,message:"server problem"})
    }
}
const authController=async(req,res)=>{
    try{
        //to find the user
        const foundUser=await User.findOne({_id:req.body.userId});
        //if not
        if(!foundUser)
        {
            return res.status(200).send({
                message:"User not found",
                success:false,
            })
        }
        else{
            console.log(foundUser)
            return res.status(200).send({
                message:"User found successfully",
                data:{
                    user: foundUser,
                },
                success:true,
            })
        }
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

module.exports={register,login,authController}