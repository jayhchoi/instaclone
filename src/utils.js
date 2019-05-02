import { nouns, adjectives } from './words'
import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'
import jwt from 'jsonwebtoken'

export const generateSecret = () => {
	const randomNumberOne = Math.floor(Math.random() * adjectives.length)
	const randomNumberTwo = Math.floor(Math.random() * nouns.length)

	return `${adjectives[randomNumberOne]} ${nouns[randomNumberTwo]}`
}

const sendMail = email => {
	const options = {
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	}

	const client = nodemailer.createTransport(sgTransport(options))
	return client.sendMail(email) // This returns a Promise
}

export const sendSecretMail = (address, secret) => {
	const email = {
		from: 'jaychoi1619@gmail.com',
		to: address,
		subject: 'Login Secret for InstaClone🔒',
		html: `
    <h1>Hello! Thank you for signing up.</h1>
    <p>Your login secret is <strong>${secret}</strong>.<br/>
    Copy & paste on the website to login!</p>
    `
	}

	return sendMail(email)
}

export const generateToken = userId => jwt.sign({ id: userId }, process.env.JWT_SECRET) // { expiresIn: '12h' }
