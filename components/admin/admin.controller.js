exports.getAdminHomepage = (req, res) => {
  res.render('admin');
};

exports.get404Page = (req, res) => {
  res.render('404');
}