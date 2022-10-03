import { FastifyInstance, RouteOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http';
import { error, parseId } from '../helpers';
import { addAddressSchema, updateAddressSchema } from '../schemas';
import type { Address } from '../address_service'
import * as addressService from '../address_service';

export default function setup(fastify: FastifyInstance) {
	fastify.route(listAddresses)
	fastify.route(showAddress)
	fastify.route(deleteAddress)
	fastify.route(updateAddress)
	fastify.route(createAddress)
}

const listAddresses: RouteOptions<Server, IncomingMessage, ServerResponse, {}> = {
	method: "GET",
	url: '/contacts',
	handler: async (request, response) => {
		response.send(addressService.getAllAddresss())
	}
}

const showAddress: RouteOptions<Server, IncomingMessage, ServerResponse, { Params: { addressId: string } }> = {
	method: "GET",
	url: '/contact/:addressId',
	handler: async (request, response) => {
		const address = addressService.getAddressById(parseId(request.params.addressId))
		if (!address) return response.code(404).send({ statusCode: 404, error: "Not found" })

		response.send(address)
	}
}

const deleteAddress: RouteOptions<Server, IncomingMessage, ServerResponse, { Params: { addressId: string } }> = {
	method: "DELETE",
	url: '/contact/:addressId',
	handler: async (request, response) => {
		const addressToDelete = addressService.getAddressById(parseId(request.params.addressId))
		if (!addressToDelete) return response.code(404).send({ statusCode: 404, error: "Not found" })

		addressService.deleteAddressById(addressToDelete.id)
		response.send(addressToDelete)
	}
}

const createAddress: RouteOptions<Server, IncomingMessage, ServerResponse, { Body: Omit<Address, "id"> }> = {
	method: "POST",
	url: '/contacts',
	schema: addAddressSchema,
	handler: async (request, response) => {
		try {
			const address = addressService.addAddress({ ...request.body })
			response.send(address)
		} catch (e) {
			return response.code(400).send(error(400, (e as Error).message))
		}
	}
}

const updateAddress: RouteOptions<Server, IncomingMessage, ServerResponse, { Body: Address }> = {
	method: "PUT",
	url: '/contacts',
	schema: updateAddressSchema,
	handler: async (request, response) => {
		const { id, ...rest } = request.body

		try {
			const address = addressService.updateAddress({ id: parseId(id), ...rest  })
			if (address) return response.send(address)

			return response.code(404).send({ statusCode: 404, error: "Not found" })
		} catch (e) {
			return response.code(400).send(error(400, (e as Error).message))
		}
	}
}

export const routes = { listAddresses, showAddress, createAddress, updateAddress, deleteAddress }
