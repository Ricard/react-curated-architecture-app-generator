export type RemoteStatus = 'empty' | 'loading' | 'error' | 'success'

export interface StateData {
	status: RemoteStatus
	errorMsg?: string
}

export const ERROR_TYPE = { CANCEL: 'Cancel' }

export const CONSUME_DICTIONARY = {
	electric: 'Electricidad',
	gas: 'Gas',
	oxygen: 'Oxígeno',
	compressedAir: 'Aire comprimido',
	water: 'Agua'
}
export type Consume = keyof typeof CONSUME_DICTIONARY
export const CONSUMES = Object.keys(CONSUME_DICTIONARY) as Consume[]
