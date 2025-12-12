import "./style.css";
import renderBook from "./Component/book.js";
import renderShelf from "./Component/shellf.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Hello ReadEra Lib</h1>
  </div>
`;

async function loadLibrary() {
  const response = await fetch("/readEra_backup/library.json");
  const data = await response.json();
  return data;
}
function get_read_books(library_data) {
  let books = [];
  for (let i = 0; i < library_data["docs"].length; i++) {
    let book = library_data["docs"][i];
    if (book["data"]["doc_have_read_time"] > 0) {
      books.push(book);
    }
  }
  return books;
}

// doc_have_read_time
async function main() {
  let myLibrary = await loadLibrary();
  // let book = myLibrary["docs"][0]["data"];
  // console.log(book);

  let readBooks = get_read_books(myLibrary);
  readBooks = readBooks.sort(
    (a, b) => b["doc_have_read_time"] - a["doc_have_read_time"],
  );
  console.log(readBooks[1]);
  readBooks = readBooks.map((json_book) => renderBook(json_book));

  console.log(readBooks);
  let shelf = renderShelf(readBooks);
  console.log(shelf);

  // let lib_div = document.createElement("div");
  // lib_div.textContent = JSON.stringify(readBooks);
  document.querySelector("#app").appendChild(shelf);
}
main();
