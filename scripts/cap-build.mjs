import { spawnSync } from 'node:child_process';
import { existsSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const apiDir = join(process.cwd(), 'app', 'api');
const hiddenApiDir = join(process.cwd(), 'app', '_api_for_vercel_tmp');

let moved = false;

try {
  if (existsSync(apiDir)) {
    renameSync(apiDir, hiddenApiDir);
    moved = true;
  }
  rmSync(join(process.cwd(), '.next'), { recursive: true, force: true });

  const result = spawnSync('npx', ['next', 'build'], {
    env: { ...process.env, CAPACITOR_EXPORT: '1' },
    shell: true,
    stdio: 'inherit'
  });

  process.exitCode = result.status ?? 1;
} finally {
  if (moved && existsSync(hiddenApiDir)) {
    renameSync(hiddenApiDir, apiDir);
  }
}
