const wrapper = document.querySelector("#wrapper");
const reset = document.querySelector("#resetbtn");
const undo = document.querySelector("#undobtn");
const redo = document.querySelector("#redobtn");

const circle = [];
const undoArr = [];

wrapper.addEventListener("click", CreatingObj);

function CreatingObj(e) {
  if (e.target.nodeName === "BUTTON") return;
  const obj = {
    id: Date.now(),
    x: e.clientX,
    y: e.clientY,
    element: null,
    backGr: ForRandomColors(),
  };
  circle.push(obj);

  CreateCircleOnScreen(obj);
}

function CreateCircleOnScreen(obj) {
  const previousObj = circle[circle.length - 1];
  const span = document.createElement("span");
  span.classList.add("circle");
  span.style.backgroundColor = previousObj.backGr;
  span.style.top = previousObj.y - 28 + "px";
  span.style.left = previousObj.x - 28 + "px";
  span.id = previousObj.id;
  wrapper.append(span);
  obj.element = span;
  EnableButton();
}

function ForRandomColors() {
  let colorcodes = "0123456789ABCDEF";
  let hash = "#";
  for (let i = 0; i < 6; i++) {
    hash += colorcodes[Math.floor(Math.random() * colorcodes.length)];
  }
  return hash;
}

function EnableButton() {
  reset.disabled = circle.length === 0;
  undo.disabled = circle.length === 0;
  redo.disabled = undoArr.length === 0;
}

reset.addEventListener("click", () => {
  circle.forEach((obj) => obj.element.remove());
  circle.length = 0;
  undoArr.length = 0;
  EnableButton();
});
undo.addEventListener("click", () => {
  let dot = circle.pop();
  let id = document.getElementById(dot.id);

  if (id) {
    id.remove();
  }

  undoArr.push(dot);
  EnableButton();
});

redo.addEventListener("click", () => {
  if (undoArr.length > 0) {
    const dot = undoArr.pop();

    circle.push(dot);
    wrapper.append(dot.element);
    EnableButton();
  }
});
