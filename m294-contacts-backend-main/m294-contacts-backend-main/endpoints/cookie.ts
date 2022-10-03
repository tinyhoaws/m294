import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { error } from '../helpers';
import { loginSchema } from '../schemas';
import { routes } from './plain'

declare module "fastify" {
	interface Session {
		email?: string
	}
}

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
	if (!request.session.email) return response.code(401).send(error(401, 'authenicate your session via /auth/cookie/login'))
}

export default function setup(fastify: FastifyInstance) {

	fastify.register(fastifyCookie);
	fastify.register(fastifySession, {
		cookieName: 'm294-session',
		secret: 'this is just an example, not a real secret',
		cookie: { secure: false, httpOnly: true },
	})

	fastify.route({ ...routes.listAddresses, url: '/auth/cookie/contacts', onRequest: authenticate })
	fastify.route({ ...routes.showAddress, url: '/auth/cookie/contact/:addressId', onRequest: authenticate })
	fastify.route({ ...routes.createAddress, url: '/auth/cookie/contacts', onRequest: authenticate })
	fastify.route({ ...routes.updateAddress, url: '/auth/cookie/contacts', onRequest: authenticate })
	fastify.route({ ...routes.deleteAddress, url: '/auth/cookie/contact/:addressId', onRequest: authenticate })

	fastify.get('/auth/cookie/status', { onRequest: authenticate }, async (request, response) => {
		response.send({ email: request.session.email })
	})

	fastify.post('/auth/cookie/login', { schema: loginSchema }, async (request: FastifyRequest<{ Body: { email: string, password: string } }>, response) => {
		const { email, password } = request.body

		if (password === 'm294') {
			request.session.email = email
			return response.send('ok')
		} else {
			return response.code(400).send({ statusCode: 400, message: 'invalid credentials, use «m294» as password', })
		}
	})

	fastify.post('/auth/cookie/logout', (request, reply) => {
		request.session.destroy()
		reply.send('ok')
	})
}
