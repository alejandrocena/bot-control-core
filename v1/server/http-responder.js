module.exports = (res) => {
  return {
    ok: (payload) => res.status(200).json(payload),
    error: (payload) => res.status(500).json(payload),
    invalid: (payload) => res.status(400).json(payload),
  }
};