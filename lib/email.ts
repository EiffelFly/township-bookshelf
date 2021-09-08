import * as aws from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';

//let nodemailer = require("nodemailer")


interface ReturnType {
  error?: {} | null
  result?: {} | null
}

interface emailOptions {
	from: string;
	html: string;
	subject: string;
	to: string;
}

export const sendEmail = async (options: emailOptions): Promise<ReturnType> => {
	const errorRetryDelay = 30000;
	let transporterSES = nodemailer.createTransport(
		getSESConfig('ap-southeast-1')
	);

	const mailOptions = {
		subject: options.subject,
		from: options.from,
		to: options.to,
		html: options.html,
	};

	try {
		await transporterSES.sendMail(mailOptions);
		return Promise.resolve({
			result: "Success"
		})
	} catch (err) {
		if (
			err.code === 'Throttling' &&
			err.message === 'Maximum sending rate exceeded.'
		) {
			await delay(errorRetryDelay);
			return sendEmail(options);
		} else {
			console.log("bottom", err)
			return Promise.reject({
				error: err
			})
		}
	}
};



const getSESConfig = (region?: string, sesConfiguration?: aws.SESClientConfig) => {
	const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
	const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
	const configuration = {
		apiVersion: '2010-12-01',
		accessKeyId,
		secretAccessKey,
		region,
		...sesConfiguration,
	};

	const ses = new aws.SESClient(configuration)

	return {
		SES: { ses, aws },
	};
};


const delay = async (after: number): Promise<void> => {
	return new Promise((resolve) => {
		return setTimeout(() => resolve(), after);
	});
};