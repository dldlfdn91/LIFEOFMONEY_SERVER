const Event = require("../../models/Event");
const Recipient = require("../../models/Recipient");

exports.createEvent = async (req, res, next) => {
  const { userId, recipientId, eventType, amount } = req.body;

  try {
    await Event.create({
      user_id: userId,
      recipient_id: recipientId,
      eventType,
      created_at: new Date(),
      money: amount
    });

    const eventLists = await Event.find({
      user_id: userId,
      recipient_id: recipientId
    });

    const spendingEventLists = eventLists.filter(event => event.money < 0);
    const receivedEventLists = eventLists.filter(event => event.money > 0);

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

    return res.status(200).send({
      successMessage: "추가되었습니다.",
      spendingEventLists,
      receivedEventLists,
      recipientLists
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ failureMessage: "다시 추가해주세요." });
  }
};

exports.getEvent = async (req, res, next) => {
  const userId = req.params.user_id;
  const recipientId = req.params.recipient_id;

  try {
    const eventLists = await Event.find({
      user_id: userId,
      recipient_id: recipientId
    });
    const spendingEventLists = eventLists.filter(event => event.money < 0);
    const receivedEventLists = eventLists.filter(event => event.money > 0);

    return res.status(200).send({ spendingEventLists, receivedEventLists });
  } catch (error) {
    console.error(error);
  }
};

exports.getTotalMoney = async (req, res, next) => {
  const userId = req.params.user_id;

  try {
    const moneyLists = await Event.find({ user_id: userId }).select(
      "-_id money"
    );
    const totalSpendMoneyLists = moneyLists.filter(money => money.money < 0);
    const totalReceivedMoneyLists = moneyLists.filter(money => money.money > 0);

    const initialValue = 0;
    const totalSpendMoney = totalSpendMoneyLists.reduce(
      (accumulator, currentValue) => accumulator + currentValue.money,
      initialValue
    );

    const totalReceivedMoney = totalReceivedMoneyLists.reduce(
      (accumulator, currentValue) => accumulator + currentValue.money,
      initialValue
    );

    res.status(200).send({ totalSpendMoney, totalReceivedMoney });
  } catch (error) {
    console.error(error);
  }
};
