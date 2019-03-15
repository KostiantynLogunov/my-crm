module.exports.overview = function (req, res) {
    res.status(200).json({
        login: 'login from controller'
    })
};

module.exports.analytics = function (req, res) {
    res.status(200).json({
        register: 'from controller'
    })
};
