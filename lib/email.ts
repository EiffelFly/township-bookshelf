import * as aws from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';

//let nodemailer = require("nodemailer")

interface ReturnType {
	error?: {} | null;
	result?: {} | null;
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
			result: 'Success',
		});
	} catch (err) {
		if (
			err.code === 'Throttling' &&
			err.message === 'Maximum sending rate exceeded.'
		) {
			await delay(errorRetryDelay);
			return sendEmail(options);
		} else {
			console.log('bottom', err);
			return Promise.reject({
				error: err,
			});
		}
	}
};

const getSESConfig = (
	region?: string,
	sesConfiguration?: aws.SESClientConfig
) => {
	const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID;
	const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY;
	const configuration = {
		apiVersion: '2010-12-01',
		accessKeyId,
		secretAccessKey,
		region,
		...sesConfiguration,
	};

	const ses = new aws.SESClient(configuration);

	return {
		SES: { ses, aws },
	};
};

const delay = async (after: number): Promise<void> => {
	return new Promise((resolve) => {
		return setTimeout(() => resolve(), after);
	});
};

export const generateEmailHtml = (userName: string, title: string, author: string, image: string, reason: string) => {
	const emailHtml = `
	<!DOCTYPE html>
	<html
		lang="zh-TW"
		xmlns="http://www.w3.org/1999/xhtml"
		xmlns:o="urn:schemas-microsoft-com:office:office"
	>
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<meta name="x-apple-disable-message-reformatting" />
			<title></title>
			<!-- Below is for outlook, xmlns & xmlns:o make sure these codes work apporiately -->
			<!--[if mso]>
				<noscript>
					<xml>
						<o:OfficeDocumentSettings>
							<o:PixelsPerInch>96</o:PixelsPerInch>
						</o:OfficeDocumentSettings>
					</xml>
				</noscript>
			<![endif]-->
			<style>
				table,
				td,
				div,
				h1,
				p {
					font-family: 'Courier New', Courier, monospace;
				}
			</style>
		</head>
		<!-- style="margin:0;padding:0;" to make sure there is no space left -->
		<body style="margin: 0; padding: 0">
			<!-- The reason to use presentation is to let screen reader know this table don't have any semantic meaning, treat it like div or span. -->
			<table
				role="presentation"
				style="
					width: 100%;
					border-collapse: collapse;
					border: 0;
					border-spacing: 0;
					background: #ffffff;
					max-width: 60%;
				"
			>
				<tr>
					<td align="center" style="padding: 30px">
						<table
							role="presentation"
							style="
								width: 100%;
								border-collapse: collapse;
								border: 0;
								border-spacing: 0;
								background: #ffffff;
							"
						>
							<tr>
								<td
									align="center"
									style="padding: 30px; border: 1px solid #000000"
								>
									<table
										role="presentation"
										style="
											width: 100%;
											border-collapse: collapse;
											border: 0;
											border-spacing: 0;
											background: #ffffff;
										"
									>
										<tr>
											<td align="left" style="width: 100%">
												<p
													style="
														font-size: 24px;
														margin: 0 0 60px 0;
														text-decoration: underline;
													"
												>
													Recommended by ${userName}
												</p>
											</td>
										</tr>
									</table>
									<table
										role="presentation"
										style="
											width: 100%;
											border-collapse: collapse;
											border: 0;
											border-spacing: 0;
											background: #ffffff;
											margin-bottom: 30px;
										"
									>
										<tr>
											<td style="width: 0.1%; white-space: nowrap">
												<img
													src="${image}"
												/>
											</td>
											<td valign="bottom" style="padding: 0 0 0 20px">
												<p style="font-size: 36px; margin: 0 0 10px 0">
													${title}
												</p>
												<p style="font-size: 12px; margin: 0 0 10px 0">
													${author}
												</p>
											</td>
										</tr>
									</table>
									<table
										role="presentation"
										style="
											width: 100%;
											border-collapse: collapse;
											border: 0;
											border-spacing: 0;
											background: #ffffff;
										"
									>
										<tr>
											<td>
												${reason}
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</body>
	</html>
	`;
	return emailHtml;
};
