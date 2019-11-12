const Recipient = require("../../models/Recipient");

exports.createRecipient = async (req, res, next) => {
  const { userId, recipient, relation } = req.body;

  try {
    await Recipient.create({
      owner: userId,
      name: recipient,
      relation
    });

    const recipientLists = await Recipient.find({ owner: userId });

    return res
      .status(200)
      .send({ successMessage: "친구가 추가되었습니다.", recipientLists });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ failureMessage: "다시 추가해주세요." });
  }
};

exports.getRecipientLists = async (req, res, next) => {
  const userId = req.params.user_id;

  try {
    const recipientLists = await Recipient.find({ owner: userId });

    return res.status(200).send({ recipientLists });
  } catch (error) {
    console.error(error);
  }
};
