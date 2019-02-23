module.exports = {
  ok: (res) => res.status(200).json({status:'ok'}),
  error: (res,error) => res.status(400).json(error),
  data: (res,data) => res.status(200).json(data),
};