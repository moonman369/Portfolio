const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
const { default: helmet } = require('helmet');
const { HttpStatusCode } = require('axios');


module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'POST, GET, OPTIONS')
        next();
        if (req.method == 'OPTIONS') {
            res.status(HttpStatusCode.Ok)
        }
    });

    app.use(
        createProxyMiddleware('/graphql',
        {
            target: 'https://leetcode.com',
            changeOrigin: true
        })
    )

    app.use(cors({
        origin: '*',
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
    }))

    app.use(
        helmet.referrerPolicy({
          policy: 'no-referrer' // Compliant
        })
    );

    app.listen(8000)
}