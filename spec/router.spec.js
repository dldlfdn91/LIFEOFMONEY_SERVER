const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../app");
require("dotenv").config();

const dbConnect = require("../config");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Test with mongoDB database", function() {
  dbConnect();

  describe("POST /event", function() {
    const eventInfo = {
      userId: "5dc91136798debb907ea0713",
      recipientId: "5dc91178798debb907ea0714",
      eventType: "결혼식",
      amount: 50000
    };

    it("should create new event", function(done) {
      this.timeout(10000);

      chai
        .request(app)
        .post("/event")
        .send({ ...eventInfo })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.spendingEventLists)).to.equal(true);
          done();
        });
    });
  });

  describe("GET /event/:user_id/:recipient_id", function() {
    const userId = "5dc91136798debb907ea0713";
    const recipientId = "5dc91178798debb907ea0714";

    it("should get eventLists from DB and send it", function(done) {
      this.timeout(20000);

      chai
        .request(app)
        .get(`/event/${userId}/${recipientId}`)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.spendingEventLists)).to.equal(true);
          done();
        });
    });
  });

  describe("GET /event/:user_id", function() {
    const userId = "5dc91136798debb907ea0713";

    it("should get total amount of money", function(done) {
      this.timeout(10000);

      chai
        .request(app)
        .get(`/event/${userId}`)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(typeof res.body.totalSpendMoney).to.equal("number");
          done();
        });
    });
  });

  describe("POST /recipients", function() {
    const recipientInfo = {
      userId: "5dc91136798debb907ea0713",
      recipient: "테스트",
      relation: "친구"
    };

    it("should create new recipient", function(done) {
      this.timeout(10000);

      chai
        .request(app)
        .post("/recipients")
        .send({ ...recipientInfo })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("successMessage");
          expect(Array.isArray(res.body.recipientLists)).to.equal(true);
          done();
        });
    });
  });

  describe("GET /recipients/:user_id", function() {
    const userId = "5dc91136798debb907ea0713";

    it("should get all recipient lists", function(done) {
      this.timeout(10000);

      chai
        .request(app)
        .get(`/recipients/${userId}`)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.recipientLists)).to.equal(true);
          done();
        });
    });
  });
});
