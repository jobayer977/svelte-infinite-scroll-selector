import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
const pkg = require('./package.json')
export default {
	input: 'src/Select.svelte',
	output: [
		{ file: pkg.module, format: 'en' },
		{ file: pkg.main, format: 'umd', name: 'Name' },
	],
	plugins: [svelte(), resolve()],
}
