const connect = require('../db');

async function updateItem(context) {
    try {
        const db = await connect();
        const request = db.request();

        const { id } = context.req.params;
        const { name, description } = context.req.body;

        const query = `
            UPDATE ITEMS
            SET Name = @Name, Description = @Description
            OUTPUT INSERTED.*
            WHERE ID = @Id
        `;

        request.input('Name', name);
        request.input('Description', description);
        request.input('Id', id);

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

module.exports = updateItem;