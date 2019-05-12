import request from "../requestPromise";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import { Buffer } from "buffer";

export default () => async (req, res, next) => {
  try {
    let body = await request({
      method: "GET",
      url: "https://www.muisz.hu",
      encoding: null
    });

    body = iconv.decode(Buffer.from(body), "ISO-8859-2")
    res.requestHtml["Műisz"] = cheerio.load(body);
    return next();
  }
  catch (err) {
    return next(err);
  }

}