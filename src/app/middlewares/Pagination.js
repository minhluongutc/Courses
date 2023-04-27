const Course = require('../models/Course');

const PAGE_SIZE = 8;

module.exports = function Pagination(req, res, next) {
    var page = req.query.page;
    if (page) {
        page = parseInt(page);
        var soLuongBoQua = (page - 1) * PAGE_SIZE;

        Course.find({}).skip(soLuongBoQua).limit(PAGE_SIZE);
    } else {
        Course.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {});
    }
};
