const axios = require("axios");
const User = require("../../models/User");

exports.facebookLogin = async (req, res, next) => {
  const token = req.body.token;

  try {
    await axios
      .get(
        `https://graph.facebook.com/v5.0/me?fields=id,email,name,picture&access_token=${token}`
      )
      .then(result => {
        const email = result.data.email;
        const username = result.data.name;
        const picture = result.data.picture.data.url;

        User.find({ email }, (err, users) => {
          user = users[0];

          if (err) {
            return next(err);
          }

          if (!user) {
            const user = new User({
              email,
              username,
              picture,
              recipients: []
            });

            user.save(err => {
              if (err) {
                return next(err);
              } else {
                res.status(200).send({
                  user: {
                    id: user._id,
                    email,
                    username,
                    picture,
                    recipients: []
                  }
                });
              }
            });
          } else {
            res.status(200).send({
              user: {
                id: user._id,
                email,
                username,
                picture,
                recipients: user.recipients
              }
            });
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
