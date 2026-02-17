// =============================================== validate Signin Fields ===============================================
export const validateSigninPage = (req, res, next) => {
    const allData = req.body;
    try {
        if(allData.email=="" && allData.password=="")
        {
            return res.json({status:false,message:"All Sign In Fiels must be Filled !"});
        }
        else
        {
            next()
        }
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}

// =============================================== validate Signup Fields ===============================================

export const validateSignupPage = (req, res, next) => {
    const allData = req.body;
    try {
        if(allData.email=="" && allData.password=="" && allData.name)
        {
            return res.json({status:false,message:"All Sign Up Fiels must be Filled !"});
        }
        else
        {
            next()
        }
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}