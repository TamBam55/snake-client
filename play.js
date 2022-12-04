const net = require("net");
const { stdin } = require("process");

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: 'localhost',
    port: 50541
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on("connect", () => {
    console.log(`Server says: Connected Successfully`);
    conn.write("Name: TLP");
  });

  conn.on("connect", () => {
    conn.write("Move: up");
    conn.write("Move: right")
    conn.write("Move: down")
  });


  conn.on("data", (data) => {
    console.log(data.toString())
    conn.end()
  });
  return conn;
};

// setup interface to handle user input from stdin

const setupInput = function () {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};

const handleUserInput = function () {
  // your code here
  stdin.on('data', (key) => {
    if (key === '\u0003') {
      process.exit();
    }
  });
};

console.log("Connecting ...");
connect();

module.exports = connect;