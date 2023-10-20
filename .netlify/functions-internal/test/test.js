const path = require("path");
const { tmpdir } = require("os");
const { open } = require("lmdb");

exports.handler = async function (event, context) {
  const TEMP_DIR = path.join(tmpdir(), `lmdb`);

  const rootDb = open({
    name: `root`,
    path: TEMP_DIR,
    compression: true,
  });

  const db = rootDb.openDB({
    name: `test`,
  });

  await db.put(`hello`, `world`);

  const value = await db.get(`hello`);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World", value }),
  };
};
