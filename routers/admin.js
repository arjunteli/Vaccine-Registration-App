const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config/database')
const Admin = require('../models/admin')
const Registration = require('../models/registration')

//To signup admin
/* The `router.post('/admin/signup', async (req, res) => { ... })` function is handling the signup
functionality for the admin. */
router.post('/admin/signup', async (req, res) => {
    try {/* The line `const admin = await Admin.getAdminByPhone(req.body.phone)` is querying the
    `Admin` model to find an admin with the specified phone number (`req.body.phone`). It is
    using the `getAdminByPhone` method defined in the `Admin` model to perform the query. The
    `await` keyword is used to wait for the query to complete and return the result. The result
    is then stored in the `admin` variable. */
    
        const admin = await Admin.getAdminByPhone(req.body.phone)
        /* The code block `if(admin) { return res.status(400).json({success: false, msg:"This admin is
        already registered."}) }` is checking if an admin with the specified phone number already
        exists in the database. */
        if(admin) {
            return res.status(400).json({success: false, msg:"This admin is already registered."})
        }
        let newAdmin = new Admin({/* The line `phone: req.body.phone` is assigning the value of
        `req.body.phone` to the `phone` property of the `newAdmin` object. */
        
            phone: req.body.phone,
            password: req.body.password
        })
        await newAdmin.save()
        res.status(201).send({success: true, msg: "Admin registered successfully."})
    }catch (e) {
        res.status(400).send(e)
    }
})

//admin to login.
/* The `router.post('/admin/login', async (req, res) => { ... })` function is handling the login
functionality for the admin. */
router.post('/admin/login', async (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    try{
        let admin = await Admin.getAdminByPhone(phone)
        if(!admin) {
            return res.status(404).json({success: false, msg:"Admin not found"})
        }

        if(password == admin.password) {
            const token = jwt.sign({_id: admin._id.toString()}, config.secret)
            admin = await Admin.findByIdAndUpdate(admin._id, {token})
            res.status(200).json({
                success: true,
                token,
                phone: admin.phone
            })
        }
        else {
            return res.status(400).json({success:false, msg: 'Wrong password'});
        }
    }catch (e) {
        res.status(400).send(e)
    }
})

//admin logout
/* The `router.post('/admin/logout', async (req, res) => { ... })` function is handling the logout
functionality for the admin. */
router.post('/admin/logout', async (req, res) => {
    try {
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, config.secret);
        const adminId = decoded._id

       /* In the provided code, `const val = await Admin.findById(adminId)` is querying the `Admin`
       model to find the admin with the specified `adminId`. The `findById()` method returns a
       promise that resolves to the admin object. */
        const val = await Admin.findById(adminId)
        val.token = undefined

        const user = await val.save()
        res.status(200).send({msg: "Successfully logged out"})

    } catch (error) {
        res.status(400).send(e)
    }
})

//admin to get the records by filters.
router.get('/admin/registrationsList', async (req, res) => {
    try {
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, config.secret);

        //taking the admin given queries
        let query = {}
       /* The code block you provided is checking if the `slotDate` and `stateOfDosage` query
       parameters are present in the request. If both parameters are present, it creates a `query`
       object with the `slotDate` and `stateOfDosage` properties set to the corresponding values
       from the request query parameters. This `query` object is used to filter the registration
       records in the subsequent code. */
        if(req.query.slotDate && req.query.stateOfDosage){
            query = {
                slotDate: req.query.slotDate,
                stateOfDosage: req.query.stateOfDosage
            }
        }
        else if(req.query.slotDate){
            query = {
                slotDate: req.query.slotDate,
            }
        }
        /* The `else if(req.query.age && req.query.pincode && req.query.stateOfDosage)` block is
        checking if the `age`, `pincode`, and `stateOfDosage` query parameters are present in the
        request. If all three parameters are present, it creates a `query` object with the `age`,
        `pincode`, and `stateOfDosage` properties set to the corresponding values from the request
        query parameters. This `query` object is used to filter the registration records in the
        subsequent code. */
        else if(req.query.age && req.query.pincode && req.query.stateOfDosage){
            query = {
                age: req.query.age,
                pincode: req.query.pincode,
                stateOfDosage: req.query.stateOfDosage
            }
        }
       /* The `else if(req.query.age && req.query.pincode)` block is checking if the `age` and
       `pincode` query parameters are present in the request. If both parameters are present, it
       creates a `query` object with the `age` and `pincode` properties set to the corresponding
       values from the request query parameters. This `query` object is used to filter the
       registration records in the subsequent code. */
        else if(req.query.age && req.query.pincode){
            query = {
                age: req.query.age,
                pincode: req.query.pincode
            }
        }
       /* The `else if(req.query.pincode && req.query.stateOfDosage)` block is checking if the
       `pincode` and `stateOfDosage` query parameters are present in the request. If both parameters
       are present, it creates a `query` object with the `pincode` and `stateOfDosage` properties
       set to the corresponding values from the request query parameters. This `query` object is
       used to filter the registration records in the subsequent code. */
        else if(req.query.pincode && req.query.stateOfDosage){
            query = {
                pincode: req.query.pincode,
                stateOfDosage: req.query.stateOfDosage
            }
        }/* The `else if(req.query.age  && req.query.stateOfDosage)` block is checking if the `age` and
        `stateOfDosage` query parameters are present in the request. If both parameters are
        present, it creates a `query` object with the `age` and `stateOfDosage` properties set to
        the corresponding values from the request query parameters. This `query` object is used to
        filter the registration records in the subsequent code. */
        
        else if(req.query.age  && req.query.stateOfDosage){
            query = {
                age: req.query.age,
                stateOfDosage: req.query.stateOfDosage
            }
        }
        else if(req.query.age){
            query = {
                age: req.query.age
            }
        }
        else if(req.query.pincode){
            query = {
                pincode: req.query.pincode
            }
        }
        else if(req.query.stateOfDosage){
            query = {
                stateOfDosage: req.query.stateOfDosage
            }
        }

        
   /* The code block you provided is handling the functionality to get registration records based on
   filters. */
        /* `const val  = await Registration.find(query).exec()` is querying the `Registration` model to
        find records that match the given `query` object. The `query` object contains the filters
        provided in the request query parameters. The `find()` method returns a promise that
        resolves to an array of matching records. The `exec()` method is used to execute the query
        and return a promise. The result is stored in the `val` variable. */
        const val  = await Registration.find(query).exec()
        return res.status(200).json({
            success: true,
            message: "Required slots",
            data : val
        });
    } catch (error) {
        res.status(400).send(e)
    }
})


module.exports = router