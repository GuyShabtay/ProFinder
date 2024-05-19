import { spawn } from 'child_process';

const url = 'http://localhost:5173/';
const outputPath = 'report.json';

const lighthouse = spawn('lighthouse', [url, '--output', 'json', '--output-path', outputPath]);

lighthouse.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

lighthouse.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

lighthouse.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
