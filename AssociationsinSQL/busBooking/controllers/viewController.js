const path = require('path');

const getView = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'view', 'view.html');
        res.sendFile(filePath);
    } catch (error) {
        res.status(500).send("Could not load the page.");
    }
}

module.exports = {
    getView 
};