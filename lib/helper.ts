import { fileURLToPath } from 'node:url'
import path from 'node:path'

export function dirname(importMetaUrl: string): string {
    return path.resolve(path.dirname(fileURLToPath(importMetaUrl)));
}