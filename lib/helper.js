import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
export function dirname(importMetaUrl) {
    return path.resolve(path.dirname(fileURLToPath(importMetaUrl)));
}
export function getVersion() {
    return JSON.parse(fs.readFileSync('package.json', 'utf-8')).version;
}
