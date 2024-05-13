const connect = require('../db');

async function createItem(context) {
    try {
        const db = await connect();
        const request = db.request();

        const { name, description } = context.req.body;

        const query = `
            INSERT INTO ITEMS (Name, Description)
            OUTPUT INSERTED.*
            VALUES (@Name, @Description)
        `;

        request.input('Name', name);
        request.input('Description', description);

        const result = await request.query(query);

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

module.exports = createItem;
