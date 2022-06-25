const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const allNums = document.querySelectorAll(".num");
const dHour = document.getElementById("d-hour");
const dMinute = document.getElementById("d-minute");
const dDayLight = document.getElementById("d-daylight");

function cssVar(name, value = null) {
  if (name[0] != "-") name = "--" + name;
  if (value) document.documentElement.style.setProperty(name, value);
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function getHour(hour, minute) {
  const value = (hour % 12) * 30;
  const extra = (minute / 60) * 100 * 0.3;
  return value + extra;
}

function getMinutes(minute, second) {
  const value = (minute / 60) * 100 * 3.6;
  const extra = (second / 60) * 100 * 0.06;
  return value + extra;
}

function setTime() {
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  const hour = getHour(h, m);
  const minute = getMinutes(m, s);
  const second = (s / 60) * 100 * 3.6;

  hourElement.style.transform = `translateX(-50%) rotate(${hour}deg)`;
  dHour.innerText = String(h % 12).length === 1 ? "0" + (h % 12) : h % 12;
  dDayLight.innerText = h > 11 ? "PM" : "AM";
  allNums.forEach((ele, index) => {
    if (index === h % 12) ele.style.color = cssVar("primary-color");
    else ele.style.color = cssVar("text-color");
  });

  minuteElement.style.transform = `translateX(-50%) rotate(${minute}deg)`;
  dMinute.innerText = String(m).length === 1 ? "0" + m : m;
  secondElement.style.transform = `translateX(-50%) rotate(${second}deg)`;
  secondElement.querySelector(".dot").innerText = s;
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    setTime();
    cssVar("stage-display", "flex");
    setInterval(setTime, 1000);
  }
};
