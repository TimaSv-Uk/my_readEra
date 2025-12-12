import renderBook from "./book";

// array, render from function renderBook(json_book)
export default function renderShelf(renderedBooks) {
  let shelfDiv = document.createElement("div");

  shelfDiv.style = `
      border: 3px solid #D4D9E4;
      display: grid;
      gap: 10px;
      grid: auto-flow minmax(2em, max-content) / repeat(50, [line1 line2 line3] 200px);
  `;
  for (let i = 0; renderedBooks.length > i; i++) {
    let renderedBook = renderedBooks[i];
    // console.log(renderedBook)
    shelfDiv.appendChild(renderedBook);
  }
  return shelfDiv;
}
