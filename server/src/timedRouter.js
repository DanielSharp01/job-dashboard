const defaultErrorMW = (req, res, next, err) => console.error(err);

function dispatch(name, mwChain, errorMiddleware = null, req = null, res = null) {
  if (errorMiddleware === null) {
    errorMiddleware = mwChain.filter(mw => mw.length === 4);
    errorMiddleware = errorMiddleware.length > 0 ? errorMiddleware[0] : defaultErrorMW;
    mwChain = mwChain.filter(mw => mw.length === 3);
  }

  if (!req) req = { name };
  if (!res) res = {};

  if (mwChain.length == 0) {
    console.log(new Date().toUTCString(), `Route ${name} ran successfuly.`);
    return;
  }

  mwChain[0](req, res, (err) => {
    if (err) {
      errorMiddleware(req, res, (err) => {
        if (err) console.error("Error middleware called itself, stack overflow what have ya!");
        else dispatch(name, mwChain.slice(1), errorMiddleware);
      }, err);
    }
    else {
      dispatch(name, mwChain.slice(1), errorMiddleware, req, res);
    }
  });
}

function everyXMillisecondsImpl(name, milliseconds, mwChain) {
  let dispatchHandler = () => {
    console.log(new Date().toUTCString(), `Route ${name} started.`);
    dispatch(name, mwChain);
  }
  let handle = setInterval(dispatchHandler, milliseconds);
  return {
    name,
    dispatch: dispatchHandler,
    unroute: () => clearInterval(handle)
  };
}

export function everyXMilliseconds(name, milliseconds, ...mwChain) {
  return everyXMillisecondsImpl(name, milliseconds, mwChain);
}

export function everyXSeconds(name, seconds, ...mwChain) {
  return everyXMillisecondsImpl(name, seconds * 1000, mwChain)
}

export function everyXMinutes(name, minutes, ...mwChain) {
  return everyXMillisecondsImpl(name, minutes * 60000, mwChain);
}