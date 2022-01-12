const router = require("express").Router();
const axios = require("axios");
const axiosRetry = require("axios-retry");

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
  let results = [];

  createResponse(varsityUrls)
    .then((val) => res.json(val))
    .catch((err) => res.status(err));
});

router.get("/students", tokenAuth, async (req, res) => {
  let result = [];
  await getData(varsityUrls)
    .then((results) => results.forEach((res) => result.push(res.value.data)))
    .catch((err) => console.log(err));

  res.json(result);
});

const getData = async (urls) => {
  axiosRetry(axios, { retries: 2 });

  const promise = await urls.map((url) => axios.get(url));

  return Promise.allSettled(promise);
};

const createResponse = async (urls) => {
  let temp = [];
  let results = [];
  return await Object.entries(urls).map(async ([varKey, varValue]) => {
    await getData(varValue).then(async (response) => {
      response.forEach((val) => {
        temp.push(val.value.data);
      });
      await Object.entries(temp[0]).forEach(async ([markKey, marksVal]) => {
        await Object.entries(temp[1]).forEach(([namesKey, namesVal]) => {
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
    });
    return results;
  });
};

module.exports = router;
