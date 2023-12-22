require('dotenv').config();
const errors = require("../errors");


const reservedKeyWords = [
    'sort_by',
    'page',
    'per_page',
    'sort_by_desc',
    'only',
    'except'
];

exports.error = (error, code = 404) => {
    return new Error(JSON.stringify(this.formatError(error, code)))
};

exports.successResponse = (res, data, code = 200) => {
    if (data instanceof Error) {
        try {
            data = JSON.parse(data.message);
        } catch (e) {
            data = this.formatError(data, 500)
        }

        if (!data.error || !data.code) {
            data = this.formatError(data, 500);
        }

        code = data.code || code;
    }

    res.status(code).json(data);
};

exports.modelNotFoundError = (res, model) => {
    return res.status(404).send(this.formatError('Does not exists ' + model + ' with the specified identifier', 404));
};

exports.errorResponse = (res, error, code = 404, name = null) => {
    return res.status(code).send(this.formatError(error, code, name));
};

exports.formatError = (error, code = 404, name = null) => {
    let errName = name || errors.STATUS_CODES[code.toString()] || "UNKNOWN_ERROR";
    if (code === 500 && process.env.isProduction) {
        errName = 'SERVER_ERROR'
    }
    let message = errors[error] || errors[errName];
    error = error || errors.STATUS_CODES[code];

    if (name) {
        return {name: name, error, code, message};
    }
    return {error, code, message};
};

exports.formatValidationError = (error) => {
    let message = error.details ? {} : null;

    if (error.details) {
        error.details.forEach(err => {
            if (message[err.path[0]]) {
                message[err.path[0]].push(err.message.split('\"').join(""))
            } else if (err.path[0]) {
                message[err.path[0]] = [err.message.split('\"').join("")]
            } else {
                message = err.message.split('\"').join("")
            }
        })
    }

    return message;
};


exports.showAll = async (req, res, model, paginate = false, filter = true, sort = true) => {

    await model.collation({locale: "en"});

    if (filter) {
        await this.filterData(req, res, model)
    }

    if (sort) {
        await this.sortData(req, res, model);
        await this.sortDataDesc(req, res, model)
    }

    if (paginate) {
        model = await this.paginateData(req, res, model)
    }
    if (!model) {
        return []; 
      }

    return model;
};

exports.filterData = async (req, res, model) => {
    Object.entries(req.query).forEach((entry) => {
        const [key, value] = entry;
        if (req.query.hasOwnProperty(key) && key && value && !reservedKeyWords.includes(key)) {
            if (value.includes(',')) {
                const array = value.split(',');
                model = model.where(key).in(array);
            } else {
                model = model.where(key).equals(value);
            }
        }
    });

    return model;
};

exports.sortData = async (req, res, model) => {
    const sortBy = req.query.sort_by;

    if (sortBy) {
        model = model.sort([[sortBy, 1]])
    }

    return model;
};

exports.sortDataDesc = async (req, res, model) => {
    const sortBy = req.query.sort_by_desc;

    if (sortBy) {
        model = model.sort([[sortBy, -1]])
    }

    return model;
};


exports.paginateData = async (req, res, model) => {

    if (req.query.per_page && req.query.per_page === '*') {
        return model;
    }

    const perPage = parseInt((req.query.per_page || 15).toString());
    const total = (await model).length;
    const last_page = Math.ceil(total / perPage);
    const page = Math.max(0, req.query.page || 1);
    const from = (page * perPage) - perPage + 1;

    const to = (page * perPage) <= total ? (page * perPage) : total;

    const data = await model.limit(perPage).skip((page * perPage) - perPage);

    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const path = req.protocol + '://' + req.get('host') + req.path;

    model = {
        current_page: page,
        data: data,
        path: path,
        first_page_url: getUrlWithPage(url, 1),
        last_page_url: getUrlWithPage(url, last_page),
        next_page_url: page < last_page ? getUrlWithPage(url, page + 1) : null,
        prev_page_url: page > 1 ? getUrlWithPage(url, page - 1) : null,
        from: page <= last_page ? from : null,
        to: page <= last_page ? to : null,
        per_page: perPage,
        total: total,
        last_page: last_page
    };

    return model;
};

function getUrlWithPage(url, page) {
    const myUrlWithParams = new URL(url);
    myUrlWithParams.searchParams.set("page", page.toString());

    return myUrlWithParams.href;

}

