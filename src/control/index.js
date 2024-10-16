import store from "../store";
import todo from "./todo";

const keyboard = {
  32: "rotate",
  37: "left",
  39: "right",
  40: "down",
  38: "up",
  82: "r",
  80: "p",
  84: "t",
};

let keydownActive;

const boardKeys = Object.keys(keyboard).map((e) => parseInt(e, 10));

const keyDown = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    return;
  }
  keydownActive = type;
  todo[type].down(store);
};

const keyUp = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    keydownActive = "";
  }
  todo[type].up(store);
};

document.addEventListener("keydown", keyDown, true);
document.addEventListener("keyup", keyUp, true);
