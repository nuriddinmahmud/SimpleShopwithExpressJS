function selfPolice(data) {
  return (req, res, next) => {
    let { id } = req.params;
    let { role } = req.user;
    if (id == req.user.id || data.includes(role)) {
      next();
      return;
    }

    res.status(405).send({ message: " Not allowed ❗" });
  };
}

export default selfPolice;
