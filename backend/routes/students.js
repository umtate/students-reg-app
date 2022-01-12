const router = require("express").Router();
const axios = require("axios");
const axiosRetry = require("axios-retry");

router.get("/raw", async (req, res) => {
  let results = [];
  let newRes = [];

  await getData().then((response) =>
    response.forEach((val) => results.push(val.value.data))
  );
  Object.entries(results[0]).forEach(([markKey, marksVal]) => {
    Object.entries(results[1]).forEach(([namesKey, namesVal]) => {
      if (markKey === namesKey) {
        newRes.push({
          student_id: namesKey,
          university: "",
          name: namesVal,
          mark: marksVal,
        });
      }
    });
  });

  res.json(newRes);
});

const getData = async () => {
  axiosRetry(axios, { retries: 2 });

  const urls = [
    "https://registree-coding-challenge.glitch.me/UJ/marks",
    "https://registree-coding-challenge.glitch.me/UJ/names",
  ];
  const promise = await urls.map((url) => axios.get(url));

  return Promise.allSettled(promise);
};

module.exports = router;
