const router = require('express').Router();
const userModel = require("../Models/user");
const {GenerateAuthToken} = require("../Heplers/Helpers");
router.post('/userLogin', async (req, res)=>{
    let reqObj=req.body
    try{
        let  resp = await userModel.find({email:reqObj.email});
        resp=JSON.parse(JSON.stringify(resp))
        let finalResponse={}
        if (resp.length>0){
            if ((resp[0].email===reqObj.email)&&(resp[0].password===reqObj.password)){
                const authToken =GenerateAuthToken({
                    email: reqObj.email,
                    password:reqObj.password
                });
                finalResponse.status="success"
                finalResponse.token=authToken
            }else{
                finalResponse.status="fail"
                finalResponse.token=""
            }
        }else{
            finalResponse.status="fail"
            finalResponse.token=""
        }
        res.status(200).json(finalResponse)
    }catch(err){
        res.json(err);
    }
})
module.exports = router;