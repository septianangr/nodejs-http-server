const fs = require('fs');

const accessLog = (req) => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const data = `[${date} ${time}] "${req.method} ${req.url} HTTP ${req.httpVersion}" ${req.client._httpMessage.statusCode} - "${req.headers['user-agent']}"`;

    const dirPath = `./logs`;
    const filePath = `${dirPath}/access_logs.txt`;

    // Check if logs directory doesn't exist
    if (!fs.existsSync(dirPath)) {

        // Crete new directory witn name logs
        fs.mkdirSync(dirPath);
    }

    // Check if file doesn't exist
    if (!fs.existsSync(filePath)) {

        // Crete new file witn name access_log.txt
        fs.writeFileSync(filePath, '', 'utf-8');
    }

    // Read access_log.txt file
    const logs = fs.readFileSync(filePath, 'utf-8');
    const newLogs = logs === '' ? data : logs + "\n" + data;

    // Write new access_log.txt file with new log data
    fs.writeFileSync(filePath, newLogs, 'utf-8');
}

// Save error log to error_log.txt file
const errorLog = (req, err) => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const data = `[${date} ${time}] "${req.method} ${req.url} HTTP ${req.httpVersion}" ${req.client._httpMessage.statusCode} - ${err}`;

    const dirPath = `./logs`;
    const filePath = `${dirPath}/error_logs.txt`;

    // Check if file doesn't exist
    if (!fs.existsSync(filePath)) {

        // Crete new file witn name error_logs.txt
        fs.writeFileSync(filePath, '', 'utf-8');
    }

    // Read error_logs.txt file
    const logs = fs.readFileSync(filePath, 'utf-8');
    const newLogs = logs === '' ? data : logs + "\n" + data;

    // Write new error_logs.txt file with new log data
    fs.writeFileSync(filePath, newLogs, 'utf-8');
}

module.exports = { accessLog, errorLog };