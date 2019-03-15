module.exports.getAll = function (req, res) {
    res.status(200).json({
        login: 'index order from controller'
    })
};

module.exports.create = function (req, res) {
    res.status(200).json({
        register: 'create order from controller'
    })
};
