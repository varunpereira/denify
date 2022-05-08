import db from '@src/utils/db';
import chatModel from '@src/models/chatModel';
import userModel from '@src/models/userModel';


db();

export async function post({ request }) {
	var { email, recipEmail } = await request.json();
	var find = await userModel.findOne({
		email,
		contacts : { $all: [recipEmail] } 
	});
	// accepts contact req automatically
	if (find === null) {
		var update1 = await userModel.updateOne(
			{
				email: email
			},
			{
				$push: {
					contacts: recipEmail
				}
			}
		);
		var update2 = await userModel.updateOne(
			{
				email: recipEmail
			},
			{
				$push: {
					contacts: email
				}
			}
		);
		var createChat = await new chatModel({
			email1: email,
			email2: recipEmail
		}).save();
	}
	return {
		body: {
		}
	};
	
}
