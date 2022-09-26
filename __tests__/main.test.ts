import * as process from 'process'
import {spawnSync} from 'node:child_process';
import * as path from 'path'
import {expect, test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('Build Policies', () => {
  process.env['INPUT_POLICYFOLDER'] = process.env['POLICYFOLDER']
  process.env['INPUT_OUTPUTFOLDER'] = process.env['OUTPUTFOLDER']
  process.env['INPUT_RENUMBERSTEPS'] = 'true'
  process.env['INPUT_VERBOSE'] = 'true'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
const result = spawnSync(
  `"${np}"`, [`"${ip}"`],
  {
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf-8',
    shell: true,
    env: process.env
  }
);
if (result.stdout)  {
  console.log(result.stdout.toString());
}
if (result.stderr)  {
    console.error(result.stderr.toString());
}

expect(result.stdout).not.toContain("::error::");
expect(result.stderr).toBeFalsy();
expect(result.status).toBe(0);

})
