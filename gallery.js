import { default as data } from "./gallery-items.js";

const ulRef = document.querySelector(".js-gallery");

const gallery = data.reduce((acc, { preview, original, description }) => {
  const liRef = document.createElement("li");
  const imgRef = document.createElement("img");
  const aRef = document.createElement("a");

  imgRef.setAttribute("src", `${preview}`);
  imgRef.setAttribute("alt", `${description}`);
  imgRef.setAttribute("data-source", `${original}`);
  aRef.setAttribute("href", `${original}`);

  imgRef.classList.add("gallery__image");
  liRef.classList.add("gallery__item");
  aRef.classList.add("gallery__link");

  aRef.append(imgRef);
  liRef.append(aRef);

  acc.push(liRef);

  return acc;
}, []);

ulRef.append(...gallery);

const modalRef = document.querySelector(".js-lightbox");
const imgModalRef = document.querySelector(".lightbox__image");
const overlayRef = document.querySelector(".lightbox__overlay");
const ulArr = Array.from(document.querySelector(".js-gallery").children);

ulRef.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName != "IMG") return;

  const liRef = e.target.parentNode.parentNode;
  const urlDataRef = e.target.dataset.source;
  let nextModalImg = ulArr.indexOf(liRef);

  modalRef.classList.add("is-open");
  imgModalRef.setAttribute("src", urlDataRef);

  overlayRef.addEventListener("click", () => {
    removeModal();
  });

  document.addEventListener("keydown", onKeyboardModal);
});

const btnRef = document.querySelector('button[data-action="close-lightbox"]');

btnRef.addEventListener("click", () => {
  removeModal();
});

function removeModal() {
  modalRef.classList.remove("is-open");

  imgModalRef.removeAttribute("src");
}

let nextModalImg;

function onKeyboardModal(event) {
  if (!nextModalImg) {
    nextModalImg = ulArr.indexOf(
      ulArr.find(
        (el) =>
          el.firstChild.firstChild.dataset.source ===
          imgModalRef.getAttribute("src")
      )
    );
  }

  if (event.code === "Escape") removeModal();

  if (event.code === "ArrowLeft") {
    nextModalImg == 0 ? (nextModalImg = ulArr.length - 1) : (nextModalImg -= 1);

    imgModalRef.removeAttribute("src");
    imgModalRef.setAttribute(
      "src",
      ulArr[nextModalImg].querySelector("img").dataset.source
    );
  }

  if (event.code === "ArrowRight") {
    nextModalImg == ulArr.length - 1 ? (nextModalImg = 0) : (nextModalImg += 1);

    imgModalRef.removeAttribute("src");
    imgModalRef.setAttribute(
      "src",
      ulArr[nextModalImg].querySelector("img").dataset.source
    );
  }
}
