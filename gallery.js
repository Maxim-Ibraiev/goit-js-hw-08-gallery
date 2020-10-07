import { default as data } from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const ulRef = document.querySelector("ul.js-gallery");

const gallery = data.reduce((acc, { preview, original, description }) => {
  const liRef = document.createElement("li");
  const imgRef = document.createElement("img");
  const aRef = document.createElement("a");

  imgRef.setAttribute("src", `${preview}`);
  imgRef.setAttribute("alt", `${description}`);
  imgRef.setAttribute("data-source", `${original}`);
  // aRef.setAttribute("href", `${original}`);

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
const imgModalRef = document.querySelector(".js-lightbox .lightbox__image");
const btnRef = document.querySelector('button[data-action="close-lightbox"]');

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
ulRef.addEventListener("click", (e) => {
  if (e.target.nodeName != "IMG") return;

  const urlDataRef = e.target.dataset.source;

  // Открытие модального окна по клику на элементе галереи.
  modalRef.classList.add("is-open");

  // Подмена значения атрибута src элемента img.lightbox__image.
  imgModalRef.setAttribute("src", urlDataRef);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") removeModal();
  });
});

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
btnRef.addEventListener("click", () => {
  removeModal();
});

function removeModal() {
  modalRef.classList.remove("is-open");

  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  imgModalRef.removeAttribute("src");
}
