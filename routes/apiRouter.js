const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        site: 'COVID-19 API (Cuba)',
        data: {
            provinces: `http://localhost:${process.env.PORT}/api/province`,
            reports: `http://localhost:${process.env.PORT}/api/report`,
        },
    });
});

module.exports = router;