import request from "../requestPromise";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import { Buffer } from "buffer";

export default () => async (req, res, next) => {
  for (let job of res.jobs.filter(job => job.tags === null)) {
    try {
      let body = await request({ method: "GET", url: job.link, encoding: job.organization === "Műisz" ? null : undefined });
      if (!body) continue;
      if (job.organization === "Műisz") body = iconv.decode(Buffer.from(body), "ISO-8859-2");
      job.detailsHtml = cheerio.load(body);
    }
    catch (err) {
      console.group(job.link + " failed");
      console.error(err);
      console.groupEnd();
    }
  }

  return next();
}