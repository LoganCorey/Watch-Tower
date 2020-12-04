import Issue from "../src/models/issue";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

let should = chai.should();

chai.use(chaiHttp);

describe("Issues", () => {
  // Empty database
  beforeEach((done) => {
    Issue.sync({ force: true })
      .then(() => {
        done(null);
      })
      .catch((dbEmptyErr: any) => {
        done(dbEmptyErr);
      });
  });

  /**
   * Test GET Route
   */

  describe("/GET issue", () => {
    it("It should GET all issues", (done) => {
      chai
        .request(app)
        .get("/issue")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * Test POST Route
   */

  describe("/POST issue", () => {
    it("It should add an issue", (done) => {
      chai
        .request(app)
        .post("/issue")
        .field("Content-Type", "multipart/form-data")
        .field("series_id", "1")
        .field("issue_number", "1")
        .field("is_variant", "false")
        .end((err, res) => {
          res.should.have.status(201);
          //res.body.should.be.a("array");
          //res.body.length.should.be.eql(0);
          done();
        });
    });
    it("It should not create an issue due to missing series_id", (done) => {
      chai
        .request(app)
        .post("/issue")
        .field("Content-Type", "multipart/form-data")
        .field("issue_number", "1")
        .field("is_variant", "false")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
