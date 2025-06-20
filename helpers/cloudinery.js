//IMAGE UPLOAD 

const cloudinery = require('cloudinary').v2
const multer =  require('multer')

cloudinery.config({
    cloud_name:"dnrjhiku7",
    api_key:"736238246621839",
    api_secret:"m7ZE9ww6O7S3_X0VftZI_JC9T90"
})

const storage = multer.memoryStorage();

async function ImageUploadUtils(file) {
    const result = await cloudinery.uploader.upload(file,{
        resource_type:'auto'
    })

    return result
}

const upload = multer({storage});

module.exports={upload, ImageUploadUtils}