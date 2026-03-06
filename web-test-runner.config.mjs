import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';

const replace = fromRollup(rollupReplace);

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    esbuildPlugin({ ts: true, target: 'auto', tsconfig: './tsconfig.json' }),
  ],
};
