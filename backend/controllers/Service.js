const Service=require('../model/Service')

const createService=async(req,res)=>{
    try{
        console.log(req.body)
//to store the data in database
        const service=await Service.create(req.body)
        if(service)
            {
                return res.status(201).send({success:true,message:"Successfully added"})
            }
    }catch(err)
    {
        return res.status(500).send({success:true,message:"server error"})
    }
}

const getService=async(req,res)=>{
    try{
        //to get all the service from database
        const getData=await Service.find()
        if(getData)
            {
                return res.status(201).send({success:true,data:{getData}})
            }
    }catch(err)
    {
        return res.status(500).send({success:true,message:"server error"})
    }
}

const getById=async(req,res)=>
{
    try{
        //get service from database for particular id
        const getData=await Service.find({_id:req.body.id})
        //if successs
        if(getData)
            {
                return res.status(201).send({success:true,data:{getData}})
            }
    }catch(err)
    {
        return res.status(500).send({success:true,message:"server error"})
    }
}

const findAndUpdate=async(req,res)=>{
    try{
        //owner to update the data
        const update=await Service.findByIdAndUpdate(req.body.id,{service:req.body.service,amount:req.body.amount},{new:true})
    //if its success
      if(update)
      {
        return res.status(201).send({success:true,message:"successfully updated"})
      }
    else{
        return res.status(500).send({success:true,message:"server problem"})
    }
}catch(err){
    return res.status(500).send({success:true,message:"server problem"})
    }
}

const deleteService=async(req,res)=>{
    try{
        //to delete the service for select the owner
        const del = await Service.findOneAndDelete({ _id: req.body.id });
       //if its find the id
      if(del)
      {
        //send the data to frontend
        return res.status(201).send({success:true,message:"successfully deleted"})
    }
    else{
        return res.status(500).send({success:true,message:"server problem"})
    }
}catch(err){
    return res.status(500).send({success:true,message:"server problem"})
    
    }
}

//to export all the function
module.exports={createService,getService,getById,findAndUpdate,deleteService}