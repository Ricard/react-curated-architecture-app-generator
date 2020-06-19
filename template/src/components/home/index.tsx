import React from 'react'
import { Box, styled, Typography } from '@material-ui/core'

import { SwitchStatus } from 'components/switchStatus'
import { SectionHeader } from 'components/sectionHeader'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'

const Styles = styled(Box)({
	padding: '2em 2em 0 2em'
})

export default function Home() {
	// const dispatch = useDispatch()

	// Use a selector to get the status of section data
	// const statusDataMonitor = useSelector(homeDataStatusSelector)

	// On first load, dispatch the section main thunk (fetch API and populate redux store)
	// useEffect(() => {
	// 	dispatch(loadHomeDataThunk())
	// }, [])

	return (
		<Styles>
			<SectionHeader title={'Home example section'} iconComponent={NetworkCheckIcon}>
				<SwitchStatus status={'loading'}>
					<Typography>Content</Typography>
				</SwitchStatus>
			</SectionHeader>
		</Styles>
	)
}
