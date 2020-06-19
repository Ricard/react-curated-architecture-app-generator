import React from 'react'
import ReactDOM from 'react-dom'

import 'typeface-roboto'
import { App } from 'components/app'

/*
	This library tracks component re-rendering and explain the causes
*/
// if (process.env.NODE_ENV !== 'production') {
// 	eslint-disable-next-line @typescript-eslint/no-var-requires
// 	const whyDidYouRender = require('@welldone-software/why-did-you-render')
// 	whyDidYouRender(React, { logOnDifferentValues: true, include: [/^PrivateRoute/] })
// }

ReactDOM.render(<App />, document.getElementById('root'))
