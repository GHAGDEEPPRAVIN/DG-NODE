// =============================== middleware for sign up fields for seller ===============================

export const validateSignUpFieldsForseller = async (req, res, next) => {
    const sellerData = req.body;
    try {
        // condition for check the seller fill data is empty or not
        if (sellerData.name == "" && sellerData.email == "" && sellerData.password == "" && sellerData.bussiness == "" && sellerData.bussiness_name == "") {
            // response for seller enterd data is empty
            return res.json({ status: false, message: "All fields must required !" })
        }
        else {
            // next for seller fill data is not empty
            next()
        }
    } catch (error) {
        // response for error occurs in try block
        res.json({ status: false, message: error.message })
    }
}

// =============================== middleware for sign up fields for seller ===============================

export const validateSignUpFieldsForSeller = async (req, res, next) => {
    const sellerData = req.body;
    try {
        // condition for check the seller fill data is empty or not
        if (sellerData.name == "" && sellerData.email == "" && sellerData.password == "" && sellerData.bussiness == "" && sellerData.bussiness_name == "") {
            // response for seller enterd data is empty
            return res.json({ status: false, message: "All fields must required !" })
        }
        else {
            // next for seller fill data is not empty
            next()
        }
    } catch (error) {
        // response for error occurs in try block
        res.json({ status: false, message: error.message })
    }
}