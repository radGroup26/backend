import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { z } from 'zod'


export function dirname(importMetaUrl: string): string {
    return path.resolve(path.dirname(fileURLToPath(importMetaUrl)));
}

export function getVersion(): string {
    return JSON.parse(fs.readFileSync('package.json', 'utf-8')).version
}