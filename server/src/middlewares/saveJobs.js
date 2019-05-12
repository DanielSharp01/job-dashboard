export default () => async (req, res, next) => {

  let promises = [];
  let counter = 0;
  for (let job of res.jobs) {
    if (job.isModified()) promises.push((async () => {
      try {
        let res = await job.save();
        counter++;
        return res;
      }
      catch (err) {
        console.group("Saving " + job.id + " of " + job.organization + " failed");
        console.error(err);
        console.groupEnd();
      }
    })());
  }

  console.log(`Attempting to save ${promises.length} jobs!`);
  await Promise.all(promises);
  console.log(`Saved ${counter} jobs!`);
  return next();
};