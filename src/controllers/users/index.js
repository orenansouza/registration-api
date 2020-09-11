const models = require("../../../models");

function responseWithPagination(data, page, limit) {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { pagination: { totalItems, totalPages, currentPage }, users };
}

function validatePayload(payload) {
  if (!payload.name) {
    return { isValid: false, message: "Favor informar o nome" };
  }

  if (!payload.email) {
    return { isValid: false, message: "Favor informar o email" };
  }
  return { isValid: true };
}

exports.createUser = async (req, res) => {
  if (!req.body.name) {
    return res.status(422).json({ success: false, message: "Favor informar o nome" });
  }

  if (!req.body.email) {
    return res.status(422).json({ success: false, message: "Favor informar o email" });
  }

  return models.User.create({ ...req.body })
    .then((userCreated) => {
      return res.status(201).json({ success: true, user: userCreated });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err.message });
    });
};

exports.getUsers = async (req, res) => {
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.limit) || 10;
  const offset = page ? page * limit : 0;

  return models.User.findAndCountAll({
    limit,
    offset,
    where: {},
  })
    .then((data) => {
      const response = responseWithPagination(data, page, limit);
      return res.status(200).json({ success: true, ...response });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err.message });
    });
};

exports.updateUser = async (req, res) => {
  const payload = validatePayload(req.body, res);
  if (!payload.isValid) {
    return res.status(422).json({ success: false, message: payload.message });
  }

  const userExist = await findOne(req.params.id);
  if (userExist) {
    return models.User.update({ name: req.body.name, email: req.body.email }, { where: { id: req.params.id } })
      .then(async () => {
        const userUpdated = await findOne(req.params.id);
        return res.status(200).json({ success: true, user: userUpdated });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, message: err.message });
      });
  }

  return res.status(400).json({ success: false, message: "user not exist" });
};

async function findOne(id) {
  return models.User.findOne({ where: { id } });
}
