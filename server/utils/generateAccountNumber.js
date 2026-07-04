const generateAccountNumber = () => {

    const year = new Date().getFullYear();

    const random = Math.floor(
        10000000 + Math.random() * 90000000
    );

    return `BNK-${year}-${random}`;
};

module.exports = generateAccountNumber;