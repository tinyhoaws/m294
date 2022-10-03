
export const updateAddressSchema = {
	body: {
		type: 'object',
		properties: {
			id: { type: 'number' },
			firstName: { type: 'number' },
			lastName: { type: 'number' },
			street: { type: 'number' },
			zipCode: { type: 'number' },
			city: { type: 'number' },
			email: { type: 'number' }
		},
		required: ['id']
	}
}

export const addAddressSchema = {
	body: {
		type: 'object',
		properties: {
			firstName: { type: 'number' },
			lastName: { type: 'number' },
			street: { type: 'number' },
			zipCode: { type: 'number' },
			city: { type: 'number' },
			email: { type: 'number' }
		},
		required: ['title']
	}
}

export const loginSchema = {
	body: {
		type: 'object',
		properties: {
			email: { type: 'string' },
			password: { type: 'string' }
		},
		required: ['email', 'password']
	}
}
