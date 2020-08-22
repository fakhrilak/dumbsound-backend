const { Transaction, User } = require('../models');
const Joi = require('@hapi/joi');
const dayjs = require('dayjs');

exports.getTransaction = async (req, res) => {
	try {
		const transaction = await Transaction.findAll({
			include: {
				model: User,
				as: 'user',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt', 'password' ]
				}
			},
			attributes: {
				exclude: [ 'createdAt', 'updatedAt' ]
			},
			order: [ [ 'createdAt', 'DESC' ] ]
		});
		if (transaction) {
			return res.status(200).send({
				massage: "Get All Transaction Succes",
				data: transaction
			});
		} 
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: error
		});
	}
};
exports.addTransaction = async (req, res) => {
	try {
		const transaction = await Transaction.create({
			...req.body
		});

			return res.status(200).send({
				massage:"Add Transaction Success",
				data: transaction
			});

	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: error
		});
	}
};

exports.editTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const { status, idUser } = req.body;
		const transaction = await Transaction.update(req.body, {
			where: {
				id
			}
		});

		let now = dayjs();
		let dueDate = now.add('5', 'day');

		let update = {};
		if (status == 'Approved') {
			update.subscribe = true;
			update.dueDate = dueDate.format('YYYY-MM-DD');
		}

		if (transaction) {await User.update(update,{ 			
				where: {
					id: idUser
				}
			});

			const resultTransaction = await Transaction.findOne({
				where: {
					id
				},
				include: {
					model: User,
					as: 'user',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt', 'password' ]
					}
				},
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			});

			return res.status(200).send({
				data: {
					resultTransaction
				}
			});
		} else {
			return res.status(400).send({
				error: {
					message: 'Try Again'
				}
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};

