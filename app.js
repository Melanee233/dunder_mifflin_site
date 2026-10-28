const byId = (id) => document.getElementById(id);

byId("today").textContent = new Intl.DateTimeFormat("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
byId("year").textContent = new Date().getFullYear();

const storageKey = "dm-preflight";
const boxes = [...document.querySelectorAll(".check input")];
const section = byId("preflight");
const bar = byId("progress-bar");
const progress = section.querySelector(".progress");
const status = byId("preflight-status");

const messages = [
  "Zaznacz, co już masz gotowe.",
  "Dobry początek. Idziemy dalej.",
  "Rozkręcasz się. Tak trzymać.",
  "Ponad połowa za Tobą.",
  "Został ostatni drobiazg.",
  "Wszystko gotowe. Możesz lecieć! 🚀"
];

function render() {
  const done = boxes.filter((box) => box.checked).length;
  bar.style.width = `${(done / boxes.length) * 100}%`;
  progress.setAttribute("aria-valuenow", String(done));
  status.textContent = done === boxes.length ? messages[5] : `${done} z ${boxes.length}. ${messages[done]}`;
  section.classList.toggle("done", done === boxes.length);
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  boxes.forEach((box, index) => { box.checked = saved.includes(index); });
} catch {}

boxes.forEach((box) => box.addEventListener("change", () => {
  render();
  try {
    localStorage.setItem(storageKey, JSON.stringify(boxes.flatMap((item, index) => item.checked ? [index] : [])));
  } catch {}
}));

render();
