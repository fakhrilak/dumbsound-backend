const { Music, Artis } = require("../models");
const Joi = require("@hapi/joi");
const { response } = require("express");

exports.getallmusic = async (req, res) => {
  try {
    const music = await Music.findAll(
        {
          include: [
            {
              model: Artis,
              as: "artis",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
    );
    return res.status(200).send({
      massage:"Get All Music success",
      data: music,
    });
  } catch (error) {
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.getonemusic = async (req, res) => {
  try {
    const { title } = req.params;
    const music = await Music.findOne({
      where: {
        title,
      },
      include: [
        {
          model: Artis,
          as: "artis",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "singerId"],
      },
    });
    if (music) {
      return res.status(200).send({
        message: "get one music succes",
        data: music,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.postmusic = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string(),
      year: Joi.string(),
      thumbnail: Joi.string(),
      artisId: Joi.required(),
      attache: Joi.string(),
    });
    const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});
		const {title} = req.body;
		const validateMusic = await Music.findOne({
			where :{
				title
			}
		})
		if(validateMusic){
			return res.status(400).send({ message: 'Music Sudah Ada' });
		}
		else{
			const music = await Music.create({
				...req.body	
			});
			const MUSIC = await Music.findOne({
				attributes: { 
					exclude: [ 'createdAt', 'updatedAt' ] 
				},
				where: {
					id: music.id
				},
				include: {
					model: Artis,
					as: 'artis',
					attributes: {
						exclude: [ 'createdAt', 'updatedAt' ]
					}
				}
			});
			return res.send({
        massage:"Add Music success",
				data: MUSIC
			});
		}

	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error});
	}
};
