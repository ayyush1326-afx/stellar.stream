import { spawn, execSync } from 'child_process';
import http from 'http';

const STACK_COMMAND = 'npm';
const STACK_ARGS = ['run', 'dev'];
const RECORD_COMMAND = 'node';
const RECORD_ARGS = ['scripts/record-demo.mjs'];
const TARGET_URL = 'http://localhost:3000';
const MAX_WAIT_MS = 60000; // 60 seconds

async function isServerReady(url) {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            resolve(res.statusCode === 200);
        }).on('error', () => {
            resolve(false);
        });
    });
}

async function waitOnServer(url, timeoutMs) {
    const start = Date.now();
    console.log(`Waiting for server at ${url}...`);
    while (Date.now() - start < timeoutMs) {
        if (await isServerReady(url)) {
            console.log("Server is ready!");
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    return false;
}

(async () => {
    console.log(">>> Starting Automation Pipeline...");

    // 1. Start Dev Server
    const devServer = spawn(STACK_COMMAND, STACK_ARGS, { 
        shell: true, 
        stdio: 'inherit',
        detached: false // We want to kill it later
    });

    try {
        // 2. Wait for server
        const ready = await waitOnServer(TARGET_URL, MAX_WAIT_MS);
        if (!ready) {
            throw new Error("Server failed to start in time.");
        }

        // 3. Run Recording Script
        console.log(">>> Starting Recording...");
        execSync(`${RECORD_COMMAND} ${RECORD_ARGS.join(' ')}`, { stdio: 'inherit' });
        console.log(">>> Recording Complete!");

    } catch (err) {
        console.error(">>> Automation Failed:", err.message);
    } finally {
        // 4. Cleanup
        console.log(">>> Shutting down dev server...");
        // On Windows, taskkill might be cleaner if spawn didn't handle it
        if (process.platform === 'win32') {
            execSync(`taskkill /pid ${devServer.pid} /T /F`, { stdio: 'ignore' }).catch(() => {});
        } else {
            devServer.kill('SIGINT');
        }
        console.log(">>> Pipeline Finished.");
        process.exit(0);
    }
})();
