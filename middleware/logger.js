import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';
import fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import { dirname } from '../lib/helper.js';
async function logEvent(message, logFileName) {
    const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
    const logsDir = path.join(dirname(import.meta.url), '../../logs');
    if (!fs.existsSync(logsDir)) {
        await fsPromises.mkdir(logsDir);
    }
    await fsPromises.appendFile(path.join(logsDir, logFileName), logItem);
}
const logger = async (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
};
export { logger, logEvent };
