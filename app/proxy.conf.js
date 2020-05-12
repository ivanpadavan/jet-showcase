require('dotenv').config();
module.exports = {
    "/api": {
        target: process.env.HOST,
        secure: false,
        changeOrigin: true,
    }
};
