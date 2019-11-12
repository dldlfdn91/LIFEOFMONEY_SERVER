const Recipient = require("../../models/Recipient");
const Event = require("../../models/Event");

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
    const recipients = await Recipient.find({ owner: userId });

    const recipientLists = await Promise.all(
      recipients.map(async recipient => {
        const recipientDoc = JSON.parse(JSON.stringify(recipient._doc));
        const moneyLists = await Event.find({
          user_id: recipient.owner,
          recipient_id: recipient._id
        }).select("-_id money");
        const spnedMoneyLists = moneyLists.filter(money => money.money < 0);
        const receivedMoneyLists = moneyLists.filter(money => money.money > 0);

        const initialValue = 0;
        const spendMoney = spnedMoneyLists.reduce(
          (accumulator, currentValue) => accumulator + currentValue.money,
          initialValue
        );

        const receivedMoney = receivedMoneyLists.reduce(
          (accumulator, currentValue) => accumulator + currentValue.money,
          initialValue
        );

        recipientDoc.spendMoney = spendMoney;
        recipientDoc.receivedMoney = receivedMoney;

        return recipientDoc;
      })
    );

    return res.status(200).send({ recipientLists });
  } catch (error) {
    console.error(error);
  }
};
