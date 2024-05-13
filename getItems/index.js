const connect = require('../db');

async function getItems(context) {
    try {
        const db = await connect();
        const request = db.request();
        const result = await request.query('SELECT * FROM ITEMS');

        context.res = {
            status: 200,
            body: result.recordset
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
}


module.exports = getItems;
