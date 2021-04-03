const puppeteer = require("puppeteer");
const $ = require("cheerio");
const url = "https://coronadashboard.rijksoverheid.nl";

const fetchNumbers = async () => {
  var numbers = [];
  var differences = [];
  var text = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page
    .goto(url)
    .then(() => {
      return page.content();
    })

    .then((html) => {
      //numbers
      $(".iWnAOR", html).each((index, elem) => {
        numbers.push($(elem).text());
      });

      //differences
      $(".kVviWI", html).each((index, elem) => {
        differences.push($(elem).text());
      });

      //full text
      $(".cxatVo", html).each((index, elem) => {
        if (index === 0) {
          var description = processText($(elem).text(), 13)
          text.push(description);
        } else if (index === 1) {
          var description = processText($(elem).text(), 11)
          text.push(description);
        }
      });
    });
  return [numbers, differences, text];
};

const processText = (text, char) => {
  let holder = text.split(" ")
  let word = holder[char]
  let counter = 0
  for (let c of word) {
    let el = Number(c)
    if (isNaN(el)){ 
      word = word.substring(0, counter) + " " + word.substring(counter, word.length)
      break;
    } else {
      counter++;
    }
  }

  holder[char] = word
  result = holder.join(" ");

  return result
}

module.exports = fetchNumbers;
