import request from "../requestPromise";
import cheerio from "cheerio";

export default () => (req, res, next) => {
  request({
    method: "GET",
    url: "https://www.schonherz.hu/diakmunkak/budapest/informatikai---support"
  }).then(body => {
    res.html = cheerio.load(body);
    next();
  });
}