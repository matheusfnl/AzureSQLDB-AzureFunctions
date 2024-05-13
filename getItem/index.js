const connect = require('../db');

async function getItem(context) {
    try {
        const db = await connect();
        const request = db.request();
        const { id } = context.req.params;

        const query = `
            SELECT *
            FROM ITEMS
            WHERE ID = @Id
        `;

        request.input('Id', id);

        const result = await request.query(query);

        context.res = {
            status: 200,
            body: result.recordset,
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
}

module.exports = getItem;
