import request from "../requestPromise";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import { Buffer } from "buffer";

export default () => (req, res, next) => {
  request({
    method: "GET",
    url: "https://www.muisz.hu",
    encoding: null,
    headers:
    {
      "Accept-Encoding": "utf-8"
    }
  }).then(body => {
    body = iconv.decode(Buffer.from(body), "ISO-8859-2")
    res.html = cheerio.load(body);
    next();
  });
}