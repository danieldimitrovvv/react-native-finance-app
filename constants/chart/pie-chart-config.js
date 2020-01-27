import Colors from "../Colors";
import ColorRest from "../../rests/ColorRest";

const legendFontSize = 10;
const legendFontColor = "#FFF";
const names = ["Seoul", "Toronto", "Beijing", "New York", "Moscow"];

const randomColor = (theme = "red") =>
  (
    "#" +
    ((Math.random() * 0xffffff) << 0).toString(16) +
    Colors[theme].pale.slice(1)
  ).slice(0, 7);

function getPopulation() {
  return Math.round(Math.random() * 10000000) / 100;
}

// async function getTheme() {
//   return await ColorRest.getTheme();
// }

function getTheme() {
  return "blue";
}

function getData() {
  theme = getTheme();
  const data = [];
  names.forEach((name, index) => {
    data.push({
      name: name,
      population: getPopulation(),
      color: Colors[theme].range[index % Colors[theme].range.length],
      // color: randomColor(),
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize
    });
  });
  return data;
}

export default getData();
