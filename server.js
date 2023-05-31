const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

const allowedCommands = ['jq', 'osmosisd'];
const blockedCommands = ['curl', 'wget', 'ssh', 'nc', 'netcat', 'rm', 'mv', 'cp', 'sudo'];
const blockedOperators = ['$', '>', '<', '&&', ';', '`', '|', '&'];

app.post('/execute', (req, res) => {
  const { command } = req.body;

  const [executable, ...params] = command.split(' ');

  if (!allowedCommands.includes(executable)) {
    return res.status(400).send('💩 Only osmosisd is allowed in this Cloud CLI environment');
  }

  if (blockedCommands.some((blockedCommand) => command.startsWith(blockedCommand))) {
    return res.status(400).send('💩 Command not allowed');
  }

  if (blockedOperators.some((blockedOperator) => command.includes(blockedOperator))) {
    return res.status(400).send('💩 Operator not allowed');
  }

  if (executable === 'osmosisd') {
    const executeCommand = ['/root/go/bin/osmosisd', ...params].join(' ');

    exec(executeCommand, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      if (stderr) {
        return res.status(500).send(stderr);
      }

      const output = stdout.trim();
      return res.send(output);
    });
  } else {
    return res.status(400).send('💩 Only osmosisd is allowed in this Cloud CLI environment');
  }
});

app.get('/', (req, res) => {
  res.render('index', { output: '' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
