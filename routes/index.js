const uniqueRandomArray = require("unique-random-array");
const data = require("../data/quotations.json");
const randomArray = uniqueRandomArray(data);

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const randomEntry = randomArray();
  const title = randomEntry.title;
  const content = randomEntry.content;

  let refreshInterval = req.query.interval || 10;

  let topic;
  if (title.indexOf(":") > -1) {
    topic = title.substring(0, title.indexOf(":"));
  } else {
    topic = "";
  }

  let sentences = uniqueRandomArray(content.split(". "));
  let quotation = sentences();

  if (quotation.indexOf("?") > -1) {
    quotation = quotation.substring(quotation.indexOf("?"), quotation.length);
    quotation = quotation.replace("? ", "");
  }

  if (!quotation.endsWith(".")) {
    quotation = quotation + ".";
  }

  if (!topic) {
    topic = title;
  }

  res.render("index", {
    title: topic,
    heading: title,
    quotation: quotation,
    refreshInterval: refreshInterval
  });
});

module.exports = router;
