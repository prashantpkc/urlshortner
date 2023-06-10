const shortid = require("shortid");
const UrlModel = require("../model/urlModel");
const { isValidLink } = require("../validation/validation");

exports.createUrl = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "No data in body" });

    if (Object.keys(data).length > 1)
      return res
        .status(400)
        .send({ status: false, message: "Only one data can send from body" });

    if (Object.keys(data) != "longUrl")
      return res
        .status(400)
        .send({ status: false, message: "longUrl is required" });

    data.longUrl = data.longUrl.trim();

    if (Object.values(data.longUrl) == "")
      return res
        .status(400)
        .send({ status: false, message: "No values provided" });

    if (!isValid.isValidLink(data.longUrl))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid longUrl" });

    let presentInDataBase = await urlModel
      .findOne({ longUrl: data.longUrl })
      .select({ _id: 0, __v: 0 });
    if (presentInDataBase)
      return res.status(200).send({
        message: "shortUrl is Already Generated",
        data: presentInDataBase,
      });

    let baseUrl = "https://localhost:3000/";
    let urlCode = shortid.generate;
  } catch (error) {}
};
