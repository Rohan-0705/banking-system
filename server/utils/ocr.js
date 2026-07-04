const Tesseract = require("tesseract.js");

const extractText = async (filePath) => {
    const result = await Tesseract.recognize(
        filePath,
        "eng"
    );

    return result.data.text;
};

module.exports = {
    extractText,
};