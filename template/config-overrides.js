/* eslint-disable @typescript-eslint/no-var-requires */
const { override, /*removeModuleScopePlugin, getBabelLoader,*/ useEslintRc } = require('customize-cra')
// const path = require('path')

// const RELATIVE_PATH_TO_SHARED_MODULE = '../shared'

// const updateIncludes = config => {
// 	const loader = getBabelLoader(config, false)
// 	loader.include = [loader.include, path.join(__dirname, RELATIVE_PATH_TO_SHARED_MODULE)]

// 	return config
// }

module.exports = override(
	useEslintRc() // force react scripts to apply our custom linting rules
	// updateIncludes, // includes shared folders to compilation react-script
	// removeModuleScopePlugin() // allows to include code oustide node (react-scripts restriction)
	// ConfiguredUnusedWebpackPlugin
)

// NOTE: FOLLOWING PLUGIN HELPS TO IDENTIFY CODE THAT ACTUALLY IS NOT INCLUDED TO PROJECT (but has too much false positives)
// const DeadCodePlugin = require('webpack-deadcode-plugin')

// const ConfiguredUnusedWebpackPlugin = config => {
// 	config.plugins.push(
// 		new DeadCodePlugin({
// 			patterns: ['src/**/*.(tsx|ts|css)'],
// 			exclude: ['**/*.(stories|spec).(js|jsx)', 'setupTests.ts', 'react-app-env.d.ts']
// 		})
// 	)
// 	return config
// }
