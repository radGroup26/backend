import { fileURLToPath } from 'node:url';
import path from 'node:path';
export function dirname(importMetaUrl) {
    return path.resolve(path.dirname(fileURLToPath(importMetaUrl)));
}
