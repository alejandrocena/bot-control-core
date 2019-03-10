module.exports = (res) => {
  return {
    ok: () => res.status(200).json({status:'ok'}),
    error: (error) => res.status(400).json(error),
    data: (data) => res.status(200).json(data)
  }
};