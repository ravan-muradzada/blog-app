// Here I have written function to remove the uploaded images.

const fs = require('fs');
const path = require('path');

const deleteImages = (post) => {
    try {
        if (post.images && post.images.length > 0) {
            post.images.forEach(image => {
                const filePath = path.join(image); 
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Delete the file
                    console.log('Deleted file:', filePath);
                } else {
                    console.log('File not found:', filePath);
                }
            });
        }

        return true;
    } catch(e) {
        console.log("Error occurred while deleting images: ", e.message);
    }
}

const deleteImage = (user) => {
    const url = user.profilePicture
    console.log('here')

    if (url) {
        const filePath = path.join(url); 
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
            console.log('Deleted file:', filePath);
        } else {
            console.log('File not found:', filePath);
        }
    }
}

module.exports = {
    deleteImages,
    deleteImage
}