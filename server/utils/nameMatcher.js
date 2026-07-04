const natural = require("natural");

const compareNames = (applicationName, extractedName) => {

    const score = natural.JaroWinklerDistance(
        applicationName.toLowerCase(),
        extractedName.toLowerCase()
    );

    return score;

};

module.exports = {
    compareNames,
};