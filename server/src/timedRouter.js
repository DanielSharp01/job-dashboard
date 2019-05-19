import uuidv4 from "uuid/v4";

const defaultErrorMW = (req, res, next, err) => console.error(err);

function dispatch(req, mwChain, errorMiddleware = null, res = null) {
  if (errorMiddleware === null) {
    errorMiddleware = mwChain.filter(mw => mw.length === 4);
    errorMiddleware = errorMiddleware.length > 0 ? errorMiddleware[0] : defaultErrorMW;
    mwChain = mwChain.filter(mw => mw.length === 3);
  }

  if (!res) res = {};

  if (mwChain.length == 0) {
    console.log(new Date().toUTCString(), `Route ${req.name} ran successfuly.`);
    return;
  }

  mwChain[0](req, res, (err) => {
    if (err) {
      errorMiddleware(err, req, res, (err) => {
        if (err) console.error(`Route ${req.name}`, "error middleware called itself, stack overflow what have ya!");
        else dispatch(req, mwChain.slice(1), errorMiddleware);
      });
    }
    else {
      dispatch(req, mwChain.slice(1), errorMiddleware, res);
    }
  });
}

function everyImpl(name, interval, delay, callFirst, mwChain) {
  let res = {
    name,
    dispatch: function () {
      console.log(new Date().toUTCString(), `Route ${this.name} started.`);
      dispatch({ name: this.name, unroute: () => this.unroute() }, mwChain);
    },
    unroute: function () {
      if (this.inTimeout) clearTimeout(this.handle);
      else clearInterval(this.handle);
    }
  };

  const scheduleInterval = () => {
    res.handle = setInterval(() => res.dispatch(), interval);
    res.inTimeout = false;
    if (callFirst) res.dispatch();
  }

  if (delay === 0) {
    scheduleInterval();
  }
  else {
    res.handle = setTimeout(() => {
      scheduleInterval();
    }, delay)
    res.inTimeout = true;
  }

  return res;
}

export default function every({ name = uuidv4(), interval, unit = "ms", delay = 0, callFirst = true }, ...mwChain) {
  if (!interval) return null;

  switch (unit) {
    case "milliseconds":
    case "ms":
      return everyImpl(name, interval, delay, callFirst, mwChain);
    case "seconds":
    case "s":
      return everyImpl(name, interval * 1000, delay * 1000, callFirst, mwChain);
    case "minutes":
    case "m":
      return everyImpl(name, interval * 60000, delay * 60000, callFirst, mwChain);
    case "hours":
    case "h":
      return everyImpl(name, interval * 3600000, delay * 3600000, callFirst, mwChain);
    default:
      return null;
  }
}