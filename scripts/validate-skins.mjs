#!/usr/bin/env node
/**
 * Validates skins.json against the Skin Manager theme schema and against the
 * CSS files actually present in themes/.
 *
 * Run with: npm run validate
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

const VALID_TAGS = new Set([
    'dark', 'light', 'minimal', 'modern', 'colorful', 'backdrops',
    'mobile-friendly', 'tv', 'icons', 'animations', 'developer'
]);
const VALID_VAR_TYPES = new Set(['text', 'color', 'number', 'boolean']);
const REQUIRED_FIELDS = ['name', 'author', 'description', 'version', 'jellyfin', 'cssUrl', 'sourceUrl'];

let skins;
try {
    skins = JSON.parse(readFileSync(join(root, 'skins.json'), 'utf8'));
} catch (err) {
    console.error(`skins.json is not valid JSON: ${err.message}`);
    process.exit(1);
}

if (!Array.isArray(skins)) {
    console.error('skins.json must be a top-level array of theme objects.');
    process.exit(1);
}

for (const [index, skin] of skins.entries()) {
    const label = skin.name ? `"${skin.name}"` : `entry #${index}`;

    for (const field of REQUIRED_FIELDS) {
        if (!skin[field]) errors.push(`${label}: missing required field "${field}"`);
    }

    if (skin.tags) {
        for (const tag of skin.tags) {
            if (!VALID_TAGS.has(tag)) {
                errors.push(`${label}: unknown tag "${tag}" (allowed: ${[...VALID_TAGS].join(', ')})`);
            }
        }
    }

    // cssUrl must point at a file that exists in this repo, so that a bad path
    // is caught here instead of by users after the theme is published.
    if (skin.cssUrl) {
        const match = skin.cssUrl.match(/(themes\/[\w.-]+\.css)$/);
        if (!match) {
            warnings.push(`${label}: cssUrl does not end in a themes/*.css path, cannot verify locally`);
        } else if (!existsSync(join(root, match[1]))) {
            errors.push(`${label}: cssUrl points at ${match[1]}, which does not exist in this repo`);
        }
    }

    if (skin.vars) {
        const declared = new Set();
        for (const v of skin.vars) {
            for (const field of ['key', 'name', 'description', 'type', 'default']) {
                if (v[field] === undefined) errors.push(`${label}: var "${v.key ?? '?'}" missing "${field}"`);
            }
            if (v.type && !VALID_VAR_TYPES.has(v.type)) {
                errors.push(`${label}: var "${v.key}" has invalid type "${v.type}"`);
            }
            if (v.key) declared.add(toCssProperty(v.key));
        }

        // Every declared var must actually be consumed by the stylesheet, and
        // every var the stylesheet reads must be declared here.
        const cssPath = skin.cssUrl?.match(/(themes\/[\w.-]+\.css)$/)?.[1];
        if (cssPath && existsSync(join(root, cssPath))) {
            const raw = readFileSync(join(root, cssPath), 'utf8');
            // Addon directives live inside comments, so read them first, then
            // strip comments so prose examples are not mistaken for real usage.
            for (const [, key] of raw.matchAll(/@sm-import-if\s+(\S+)/g)) {
                if (!skin.vars.some((v) => v.key === key)) {
                    errors.push(`${label}: addon "@sm-import-if ${key}" has no matching boolean var`);
                }
            }

            const css = raw.replace(/\/\*[\s\S]*?\*\//g, '');
            for (const prop of declared) {
                if (!css.includes(`var(${prop}`) && !css.includes(`{{${prop.slice(2)}}}`)) {
                    warnings.push(`${label}: var "${prop}" is declared but never used in ${cssPath}`);
                }
            }
            for (const [, prop] of css.matchAll(/var\((--[a-z0-9-]+)/g)) {
                if (prop.startsWith('--of-') || prop.startsWith('--jf-')) continue;
                if (!declared.has(prop)) {
                    errors.push(`${label}: ${cssPath} reads "${prop}" but skins.json does not declare it`);
                }
            }
        }
    }
}

/** Skin Manager lowercases and kebab-cases var keys: FONT_SIZE -> --font-size. */
function toCssProperty(key) {
    return `--${key
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase()}`;
}

for (const warning of warnings) console.warn(`warning  ${warning}`);
for (const error of errors) console.error(`error    ${error}`);

if (errors.length) {
    console.error(`\n${errors.length} error(s) in skins.json`);
    process.exit(1);
}

console.log(`skins.json OK (${skins.length} theme(s), ${warnings.length} warning(s))`);
