# Osmosisd Web CLI

This is a simple Express server for Osmosis Web CLI. It provides a web interface to execute commands related to Osmosis using the `osmosisd` command-line tool. The application restricts the use of certain commands, blocks specific operators, and only allows the `osmosisd` command from a predefined list of commands.

## Warning
This should only be ran on servers you are willing to get hacked. This is a web CLI that allows you to run commands on your server, there are many ways a server could get compromised with this tool. We will add more instructions on how to properly setup the server with a user that only has access to the osmosisd binary and nothing in the enar future. This was releases as is and no warranties are provided.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- PM2 (optional to keep the process running)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the following command:

```
npm install
```

## Usage

1. Start the Express server by running the following command:

```
npm start
```
 You can also use `pm2 start server.js` to keep the process running in production.

The server will start and listen on the specified port (default is 3000).

2. Open a web browser and navigate to `http://localhost:3000` (replace `3000` with the appropriate port if you changed it).

3. The web interface will be displayed, allowing you to execute commands and view their output.

## Available Routes

- `GET /`: Renders the index page of the web application.

- `POST /execute`: Accepts a command as input and executes it using the `osmosisd` command-line tool. Returns the output of the executed command.

## Command Restrictions

The application imposes the following restrictions on commands:

- Only the `osmosisd` command is allowed from the predefined list of commands.
- Certain commands are blocked, including `curl`, `wget`, `ssh`, `nc`, `netcat`, `rm`, `mv`, `cp`, and `sudo`.
- Blocked operators such as `$`, `>`, `<`, `&&`, `;`, \`, `|`, and `&` are not allowed in commands.

TODO: Add more instructions on how to properly setup the server with a user that only has access to the osmosisd binary and nothing else.

TODO: Allow all the osmosisd sub commands (whitelist, and block everything else).

## Frontend

The frontend of the application is built using HTML, CSS, and JavaScript. It provides a user-friendly interface to enter commands, view command output, and maintain a command history. The frontend code is located in the HTML file `index.html` and includes inline JavaScript code for functionality. This is just a POC, if you want to make a nextjs application, please feel free to fork and contribute. 


## Configuration

The application uses the default configuration provided in the source code. However, you can modify the following settings if needed:

- `allowedCommands`: Array of allowed commands. By default, only `osmosisd` is allowed.
- `blockedCommands`: Array of blocked commands. By default, commands like `curl`, `wget`, `ssh`, etc., are blocked.
- `blockedOperators`: Array of blocked operators. By default, operators like `$`, `>`, `<`, etc., are blocked.
- `PORT`: Port on which the server listens. By default, it uses port 3000. You can change it by setting the `PORT` environment variable or modifying the `PORT` constant.

## License

This application is provided under the [MIT License](LICENSE). Feel free to modify and distribute it as needed.

## Disclaimer

The application is intended for educational and demonstration purposes only. Use it responsibly and ensure proper security measures are in place when deploying it in a production environment. The developer and the project contributors are not responsible for any misuse or damage caused by the application.
