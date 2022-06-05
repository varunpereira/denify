import db from '@src/utils/db';
import userModel from '@src/models/userModel';
import sgMail from '@sendgrid/mail';

db();
sgMail.setApiKey(import.meta.env.VITE_sendgridApiKey);

export async function post({ request }) {
	var formValues = await request.json();
	var msg = {
		to: 'laughlifelong@gmail.com', 
		from: 'laughlifelong@gmail.com',
		subject: 'Sending with SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>'
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
	return {
		body: {
			
		}
	};
}
