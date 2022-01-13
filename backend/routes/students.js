const router = require("express").Router();
const axios = require("axios");
const axiosRetry = require("axios-retry");
const tokenAuth = require("../middleware/jwtAuthToken");
const authenticate = require("../services/auth");

const varsityUrls = {
  uj: [
    "https://registree-coding-challenge.glitch.me/UJ/marks",
    "https://registree-coding-challenge.glitch.me/UJ/names",
  ],
  su: [
    "https://registree-coding-challenge.glitch.me/SU/marks",
    "https://registree-coding-challenge.glitch.me/SU/names",
  ],
};

router.get("/raw", async (req, res) => {
  if (req.headers.authorization) {
    authenticate(req)
      ? createResponse(varsityUrls, res)
      : res.status(403).json({ errr: "No credentials sent" });
  } else {
    res.status(403).json({ error: "Not authorised" });
  }
});

router.get("/students", tokenAuth, async (req, res) => {
  createResponse(varsityUrls, res);
});

const getData = async (urls) => {
  axiosRetry(axios, { retries: 2 });

  const promise = await urls.map((url) => axios.get(url));

  return Promise.allSettled(promise);
};

const createResponse = async (urls, res) => {
  let temp = [];
  let results = [];
  Object.entries(urls).forEach(async ([varKey, varValue]) => {
    await getData(varValue)
      .then(async (response) => {
        response.forEach((val) => {
          temp.push(val.value.data);
        });
      })
      .then(() => {
        Object.entries(temp[0]).forEach(async ([markKey, marksVal]) => {
          Object.entries(temp[1]).map(([namesKey, namesVal]) => {
            if (markKey === namesKey) {
              results.push({
                student_id: namesKey,
                university: varKey,
                name: namesVal,
                mark: marksVal,
              });
            }
          });
        });

        res.json(results);
      })
      .catch((err) => res.status(500).json({ error: "something went wrong" }));
  });
};

module.exports = router;
