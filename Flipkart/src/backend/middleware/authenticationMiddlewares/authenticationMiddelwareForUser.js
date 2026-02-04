
// =============================== middleware for sign in fields ===============================

export const validateSignInFields = async (req, res, next) => {
    const userData = req.body;
    try {
        // condition for check the user or seller fill data is empty or not
        if (userData.email == "" && userData.password == "") {
            // response for user or seller enterd data is empty
            return res.json({ status: false, message: "All fields must required !" })
        }
        else {
            // next for user or seller fill data is not empty
            next()
        }
    } catch (error) {
        // response for error occurs in try block
        res.json({ status: false, message: error.message })
    }
}

// =============================== middleware for sign up fields for user ===============================

export const validateSignUpFieldsForUser = async (req, res, next) => {
    const userData = req.body;
    try {
        // condition for check the user fill data is empty or not
        if (userData.name == "" && userData.email == "" && userData.password == "") {
            // response for user enterd data is empty
            return res.json({ status: false, message: "All fields must required !" })
        }
        else {
            // next for user fill data is not empty
            next()
        }
    } catch (error) {
        // response for error occurs in try block
        res.json({ status: false, message: error.message })
    }
}
