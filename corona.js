const puppeteer = require("puppeteer");
const url = "https://coronadashboard.rijksoverheid.nl";

const fetchNumbers = async () => {
  var numbers = [];
  var text = [];
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForXPath("/html/body/div/div/div/div/div[2]/div/div[3]/div[1]/div/div[2]/p")

  let positiveTestsHandle = await page.$x("/html/body/div/div/div/div/div[2]/div/div[3]/div[1]/div/div[2]/p")
  let hospitalAdmissionsHandle = await page.$x("/html/body/div/div/div/div/div[2]/div/div[3]/div[2]/div/div[2]/p")
  let vaccinesDoneHandle = await page.$x("/html/body/div/div/div/div/div[2]/div/div[3]/div[3]/div/p[1]")
  

  let positiveTest = await page.evaluate(el => el.textContent, positiveTestsHandle[0])
  let hospitalAdmissions = await page.evaluate(el => el.textContent, hospitalAdmissionsHandle[0])
  let vaccinesDone = await page.evaluate(el => el.textContent, vaccinesDoneHandle[0])

  positiveTest = processText(positiveTest, 13)
  hospitalAdmissions = processText(hospitalAdmissions, 11)

  text.push(positiveTest)
  text.push(hospitalAdmissions)
  numbers.push(vaccinesDone)

  return [numbers, text];
};

const processText = (text, char) => {
  let holder = text.split(" ");
  let word = holder[char];
  let counter = 0;
  for (let c of word) {
    let el = Number(c);
    if (isNaN(el)) {
      word =
        word.substring(0, counter) + " " + word.substring(counter, word.length);
      break;
    } else {
      counter++;
    }
  }

  holder[char] = word;
  result = holder.join(" ");

  return result;
};

module.exports = fetchNumbers;
