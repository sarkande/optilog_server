const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 5050;

app.use(cors());
app.use(bodyParser.json());

// Log to confirm static files are being served
// app.use(
//   express.static(path.join(__dirname, "public"), {
//     setHeaders: (res, path, stat) => {
//       console.log("Serving static file:", path);
//     },
//   })
// );
// app.use("/js", express.static(path.join(__dirname, "./js")));
const logFile = "logs.json";

// Fonction pour lire les logs depuis le fichier JSON
const readLogs = (callback) => {
  fs.readFile(logFile, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Le fichier n'existe pas, retourner un tableau vide
        return callback(null, []);
      } else {
        return callback(err);
      }
    }
    try {
      const logs = JSON.parse(data);
      callback(null, logs);
    } catch (err) {
      callback(err);
    }
  });
};

// Fonction pour écrire les logs dans le fichier JSON
const writeLogs = (logs, callback) => {
  fs.writeFile(logFile, JSON.stringify(logs, null, 2), "utf8", callback);
};

app.post("/log", (req, res) => {
  const logMessage = req.body.log;
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const logEntry = { timestamp, message: logMessage };

  readLogs((err, logs) => {
    if (err) {
      console.error("Failed to read log file:", err);
      return res.sendStatus(500);
    }

    logs.push(logEntry);

    writeLogs(logs, (err) => {
      if (err) {
        console.error("Failed to write log:", err);
        return res.sendStatus(500);
      }
      console.log(`Received log: ${logMessage}`);
      res.sendStatus(200);
    });
  });
});

app.get("/logs", (req, res) => {
  readLogs((err, logs) => {
    if (err) {
      console.error("Failed to read log file:", err);
      return res.sendStatus(500);
    }
    res.json(logs);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
