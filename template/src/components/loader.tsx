import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

const Styles = styled.div`
	.center {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.fullscreen {
		position: absolute;
	}
	.embedded {
		position: relative;
	}
`
interface LoaderProps {
	fullscreen?: boolean
}
const Loader = ({ fullscreen = true }: LoaderProps) => (
	<Styles>
		<div className={`center ${fullscreen ? 'fullscreen' : 'embedded'}`}>
			<CircularProgress color="secondary" size="3em" />
		</div>
	</Styles>
)

export default Loader
