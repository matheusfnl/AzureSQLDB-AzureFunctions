const connect = require('../db');

async function deleteItem(context) {
    try {
        const db = await connect();
        const request = db.request();
        const { id } = context.req.params;
        const query = `
            DELETE FROM ITEMS
            WHERE ID = @Id
        `;

        request.input('Id', id);

        await request.query(query);

        context.res = {
            status: 200,
            body: []
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
}

module.exports = deleteItem;
