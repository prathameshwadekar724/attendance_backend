let errorMiddleWare=(err,req,res,next)=>{
    console.log("ERROR:",err.message);
    res.status(500).send({
        status:0,
        message:"Something went wrong",
        error:err.message
    });
}
module.exports=errorMiddleWare;