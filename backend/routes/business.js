const {Business} = require('../models/business');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');

// vendoremail  useremail  complaint mobile lat long status

// File upload //
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

  
  const upload = multer({ storage: storage });


// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const businessList = await Business.find();

    if(!businessList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(businessList);
})



router.get(`/:id`, async (req, res) =>{
    const businessList = await Business.findById(req.params.id);

    if(!businessList) {
        res.status(500).json({success: false})
    } 
    res.send(businessList);
})



router.post('/',  upload.single('image'), async (req,res)=>{
    
    
    const file = req.file ;
    if (!file) return res.status(400).send('No image in the request');
//    const imagePath = req.file ? req.file.path : undefined;

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let business = new Business({
        vendoremail: req.body.vendoremail,
        name: req.body.name,
        type: req.body.type,
        mechanicname: req.body.mechanicname,
        service: req.body.service,
        available: req.body.available,
        locality: req.body.locality,
        address: req.body.address,
        city: req.body.city,
        mobile: req.body.mobile,
        status: req.body.status,
        image: `${basePath}${fileName}` 
    })
    business = await business.save();

    if(!business)
    return res.status(400).send('the business cannot be created!')
    res.send(business);
    
})



router.delete('/:id', auth, (req, res)=>{
    Business.findByIdAndRemove(req.params.id).then(business =>{
        if(business) {
            return res.status(200).json({success: true, message: 'the business is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "business not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const businessId = req.params.id;
        const business = await Business.findById(businessId);

        if (!business) {
            return res.status(404).json({ success: false, message: 'Business not found!' });
        }

        let imagePath = business.image; // default to existing image

        if (req.file) {
            const fileName = req.file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            imagePath = `${basePath}${fileName}`;
        }

        const updatedBusiness = await Business.findByIdAndUpdate(
            businessId,
            {
                vendoremail: req.body.vendoremail,
                name: req.body.name,
                type: req.body.type,
                mechanicname: req.body.mechanicname,
                service: req.body.service,
                available: req.body.available,
                locality: req.body.locality,
                address: req.body.address,
                city: req.body.city,
                mobile: req.body.mobile,
                status: req.body.status,
                image: imagePath
            },
            { new: true }
        );

        if (!updatedBusiness) {
            return res.status(500).send('The business cannot be updated');
        }

        res.send(updatedBusiness);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});






router.put('/map/:id',async (req, res)=> {
    const business = await Business.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )

    if(!business)
    return res.status(400).send('the business cannot be created!')

    res.send(business);
})



router.put('/status/:id', auth, async (req, res)=> {
    const business = await Business.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!business)
    return res.status(400).send('the business cannot be created!')

    res.send(business);
})


// PUT route to update the status and upload an image for a itemauth,
router.put('/upload_image/:id',  upload.single('image'), async (req, res) => {
    
    try {
      const itemId = req.params.id;
      //const { status, reason, remedies, notes } = req.body;
      //const image = req.file ? req.file.path : undefined;
  
      
    const file = req.file ;
    if (!file) return res.status(400).send('No image in the request');
//    const imagePath = req.file ? req.file.path : undefined;

    const fileName = file.filename;
    const image = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;


      // Find the item by ID and update its status and image path
      const updatedPostitem = await Onroad.findByIdAndUpdate(
        itemId,
        { $set: {image } },
        { new: true } // To return the updated document
      );
  
      if (!updatedPostitem) {
        return res.status(404).json({ success: false, message: 'item not found' });
      }
  
      res.status(200).json({ success: true, message: 'item  image updated successfully', item: updatedPostitem });
    } catch (error) {
      console.error('Error updating item  image:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



module.exports =router;