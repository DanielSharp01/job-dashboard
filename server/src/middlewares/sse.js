import moment from "moment";
import uuidv4 from "uuid/v4";

export default (sseClients) => (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  res.write("\n");
  let clientId = uuidv4()
  console.log(new Date().toUTCString(), clientId, "Opening SSE request!");
  let heartbeatInterval = setInterval(() => res.write('\n'), 1000);
  res.on("close", () => {
    delete sseClients[clientId];
    clearInterval(heartbeatInterval);
    console.log(new Date().toUTCString(), clientId, "client closed SSE request!");
  });

  sseClients[clientId] = {
    sendEvent: ({ id, event, data }) => {
      if (id) res.write(`id: ${id}\n`);
      if (event) res.write(`event: ${event}\n`);
      if (typeof data === "object") res.write(`data: ${JSON.stringify(data)}\n`);
      else if (typeof data !== "undefined") res.write(`data: ${data}\n`);
      res.write(`\n`);
    }
  };
}