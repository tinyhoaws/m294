
export type Address = {
	id: number;
	firstName?: string;
	lastName?: string;
	street?: string;
	zipCode?: string;
	city?: string;
	email?: string;
}

export class AddressInvalid extends Error {
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, AddressInvalid.prototype);
	}
}

let addresses: Address[] = [
	{ id: 1, firstName: "Peter", lastName: "Muster", street: "Edenstrasse 20", zipCode: "8000", city: "Zürich", email: "test@example.com" }
]

export function getAddressById(id: number | undefined): Address | undefined {
	return addresses.find((address) => address.id == id)
}

export function getAllAddresss(): Address[] {
	return addresses
}

export function deleteAddressById(id: number | undefined) {
	addresses = addresses.filter(address => address.id != id)
}

export function getNextId(): number {
	return Math.max(...addresses.map(address => address.id)) + 1
}

export function addAddress(addressInput: Partial<Address>): Address {
	if (!addressInput.firstName && !addressInput.lastName) {
		throw new Error("firstName or lastName must be present")
	}

	const address: Address = {
		id: getNextId(),
		...addressInput
	}
	addresses.push(address)
	return address
}

export function updateAddress(addressInput: Partial<Address>): Address | undefined {
	const address = getAddressById(addressInput.id)
	if (!address) return

	if (!addressInput.firstName && !addressInput.lastName) {
		throw new Error("firstName or lastName must be present")
	}

	Object.assign(address, addressInput)

	return address
}
