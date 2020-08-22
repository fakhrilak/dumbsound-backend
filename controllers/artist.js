const { Music, Artis } = require("../models");
const Joi = require("@hapi/joi");
const { response } = require("express");


exports.postartis = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      old: Joi.number().required(),
      type: Joi.string().required(),
      startcarer: Joi.date().required(),
    });
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
      const artis = await Artis.create({
        ...req.body,
      });
      
      return res.status(200).send({
        data: artis,
      });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: error,
      },
    });
  }
};

exports.getallartis = async (req, res) => {
	try {
		const artis = await Artis.findAll(
			{
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			}
		);
		return res.status(200).send({
			data: artis
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};
