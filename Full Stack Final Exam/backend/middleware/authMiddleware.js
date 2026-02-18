export const validateSigninFields = (req,res,next) => {
    const {email,password,role} = req.body;
    try {
        if(email=="" && password=="" && role=="")
        {
            res.json({status:false,message:"All Feild Must Be filled !"})
        }
        else{
            next()
        }
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}

export const validateSignupFields = (req,res,next) => {
    const {name,email,password,role} = req.body;
    try {
        if(name==""&& email=="" && password=="" && role=="")
        {
            res.json({status:false,message:"All Feild Must Be filled !"})
        }
        else{
            next()
        }
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}