const Recipient = require("../../models/Recipient");
const User = require("../../models/User");

exports.createRecipient = async (req, res, next) => {
  const { userId, recipient, relation } = req.body;

  try {
    const recipientInfo = await Recipient.create({
      name: recipient,
      relation
    });

    const recipients =  await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { recipients: recipientInfo._id } },
      { new: true, upsert: true }
    ).select("-_id recipients");

    const recipientArray = recipients.recipients;
    const recipientLists = await Promise.all(
      recipientArray.map(async recipientId => {
        const recipient = await Recipient.findById({ _id: recipientId });

        return recipient;
      })
    );

    return res.status(200).send({ successMessage: "친구가 추가되었습니다.", recipientLists });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ failureMessage: "다시 추가해주세요." });
  }
};

exports.getRecipientLists = async (req, res, next) => {
  const userId = req.params.user_id;

  try {
    const recipients = await User.findById({ _id: userId }).select(
      "-_id recipients"
    );

    const recipientArray = recipients.recipients;
    const recipientLists = await Promise.all(
      recipientArray.map(async recipientId => {
        const recipient = await Recipient.findById({ _id: recipientId });

        return recipient;
      })
    );

    return res.status(200).send({ recipientLists });
  } catch (error) {
    console.error(error);
  }
};
