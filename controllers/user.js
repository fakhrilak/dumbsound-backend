const {User} = require('../models');
const Joi = require('@hapi/joi');

exports.getalluser= async (req, res) => {
	try {
		const user = await User.findAll({
			attributes: {
				exclude: ['password']
			}
		});
		if (!user) {
			return res.status(500).send({
				message: "user not found"
			});
		} else {
			return res.send({
				massage:"get user succsess",
				data: user
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: error
			}
		});
	}
};

exports.deleteuser = async (req, res) => {
	try {
		const {id} = req.params
		const user = await User.findOne({
			where: {
				id
			}
		});
		if (!user) {
			return res.status(400).send({
				error: {
					message: 'tidak ada user'
				}
			});
		} else {
			const deleteUser = await User.destroy({
				where: {
					id
				}
			});
			return res.send({
				data: {
					massage:"deleted user",
					data:user	
				}
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: error
			}
		});
	}

};

exports.editsubs = async (req, res) => {
	try{
		const { id } = req.params;
		const { status, idUser } = req.body;
		const transaction = await User.update(req.body, {
			where: {
				id
			}
		});
		let update = {};
		if (status <= '0' ) {
			update.subscribe = false;
		}else if(status>=1){
			update.subscribe = true;
		}
		if (transaction) {await User.update(update, {			
				where: {
					id: idUser
				}
			});
		}
	}catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
}
