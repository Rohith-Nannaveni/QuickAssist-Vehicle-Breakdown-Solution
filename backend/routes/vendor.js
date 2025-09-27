const {Vendor} = require('../models/vendor');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const vendorList = await Vendor.find().select('-passwordHash');
    if(!vendorList) {
        res.status(500).json({success: false})
    } 
    res.send(vendorList);
})


router.post(`/`, async (req, res) =>{
    let vendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        city: req.body.city,
        question1: req.body.question1,
        question2: req.body.question2,
    })
    vendor = await vendor.save();
    if(!vendor) 
    return res.status(500).send('The Vendor cannot be created')

    res.send(vendor);
})



router.post('/login', async (req,res) => {
    const vendor = await Vendor.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!vendor) {
        return res.status(400).send('The vendor not found');
    }

    if(vendor && bcrypt.compareSync(req.body.password, vendor.passwordHash)) {
        const token = jwt.sign(
            {
                vendoremail: vendor.email,
                isAdmin: vendor.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({vendor: vendor.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})

router.post('/reset_password_vendor', async (req, res) => {
    const { question1, question2, newPassword } = req.body;
  
    try {
      // Find the vendor by email
      const vendor = await Vendor.findOne({ email: req.body.email });
  
      // Check if the vendor exists
      if (!vendor) {
        return res.status(404).json({ error: 'vendor not found' });
      }
      // Check if security questions match
      if (vendor.question1 !== question1 ||  vendor.question2 !== question2) {
        return res.status(400).json({ error: 'Security questions do not match' });
      }
            // Hash the new password
            
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            
            // Update the vendor's password
            vendor.passwordHash = hashedPassword;

            // Save the updated vendor
            await vendor.save();  
            res.status(200).json({ message: 'Password reset successful' });
            //res.send(vendor);


    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports =router;