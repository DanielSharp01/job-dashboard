import request from "../requestPromise";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import { Buffer } from "buffer";

export default () => async (req, res, next) => {
  let promises = [];
  let requestableJobs = res.jobs.filter(job => job.tags === null);
  console.log(`Requesting ${requestableJobs.length} jobs.`);
  for (let job of requestableJobs) {
    promises.push((async () => {
      try {
        let body = await request({ method: "GET", url: job.link, encoding: job.organization === "Műisz" ? null : undefined });
        if (!body) return;
        if (job.organization === "Műisz") body = iconv.decode(Buffer.from(body), "ISO-8859-2");
        job.detailsHtml = cheerio.load(body);
      }
      catch (err) {
        console.group(job.link + " failed");
        console.error(err);
        console.groupEnd();
      }
    })());
  }

  await Promise.all(promises);
  return next();
}