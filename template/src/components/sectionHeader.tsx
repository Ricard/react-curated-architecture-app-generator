import React, { ReactElement, useState } from 'react'
import { Typography, Box, styled, Divider } from '@material-ui/core'

const Styles = styled(Box)({
	padding: '1.5em 1.5em 1em 1.5em',

	'& .title': {
		color: '#999',
		textTransform: 'capitalize',
		fontWeight: '500',

		'& .icon': {
			display: 'flex',
			margin: '0em 0.5em 0.2em'
		}
	},

	'& .content': {
		paddingTop: '1.3em'
	}
})

interface SectionHeaderProps {
	title: string | ReactElement
	iconComponent: Function
	children: ReactElement
	hideable?: boolean
}

export const SectionHeader = ({
	title,
	iconComponent: IconComponent,
	children,
	hideable = false
}: SectionHeaderProps) => {
	const [isHided, setIsHide] = useState(true)
	const handleHide = () => {
		setIsHide(!isHided)
	}

	return (
		<Styles>
			<Typography
				onClick={handleHide}
				variant="h6"
				gutterBottom
				noWrap
				className="title"
				style={{
					cursor: 'pointer',
					color: hideable && isHided ? '#e0e0e0' : '#999',
					fontStyle: hideable && isHided ? 'italic' : 'normal'
				}}
			>
				<Box display="flex" alignItems="flex-end">
					<Box className="icon">
						<IconComponent />
					</Box>
					{title}
				</Box>
			</Typography>
			<Divider />
			{hideable && isHided ? <></> : <Box className="content">{children}</Box>}
		</Styles>
	)
}
