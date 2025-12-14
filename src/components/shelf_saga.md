TODO:
    - make shelf look like a shelf
        - put all books side by side with no space betwixt )
        - calculate number of book on shelf that will fit on screen


so far i use flex:wrap and it kinda works but i have no idea how to add shelf platforms(thinds thar acualy hold books)

### my best  try so far, it don't work 😀😀😀😀😀😀😀😀😀 
            ```
            <script define:vars={{bookCount,bookSizeMinMax}}>
              const booksPerRow = Math.max(
                1,
                Math.floor((bookCount * bookSizeMinMax.max_width)/window.innerWidth)
              );
              console.log(booksPerRow)
              console.log(window.innerWidth)
              console.log(window.innerHeight)
            </script>


            <div id="shelf"
              style="
                
                border: 3px solid #D4D9E4;
                width: fit-content;
              "
              
            >
              {chunkArray(jsonBooks,10).map((rowOfBooks,i) => (
              <div id=`${i}`
                  class="shelf_row"
                  style="
                    border: 3px solid #E03F66;

                  //width: fit-content;
                    display:flex;
                    flex:row;
                  "
                >
                <Book jsonBook={jsonBook} bookSizeMinMax={bookSizeMinMax} />
                  {rowOfBooks.map((jsonBook) => (
                  ))} 
                </div>
              ))} 
            </div>
            ```


## IDEA: 
    - add hard coded media query and render html to fit it,then just swap it
        i thik that'll make html file too large and slow
    - render shelf in script, probably will break on page resize
        but wait, maybe I CAN SCALE ROWS to so it look ok


### Flex wrap version

            ```
                <div id="shelf" class="shelf-container"
                  style=`
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.1rem;     
                    border: 3px solid #D4D9E4;
                    width: 85%;
                    align-items:flex-end;
                `
                >
                  {jsonBooks.map((jsonBook) => (
                    <Book jsonBook={jsonBook} bookSizeMinMax={bookSizeMinMax} />
                  ))}
                </div>

            ```


# i'm having a moment, freaking EVRIKA   
    my idea is to reander my books on server  and then wrap them into div.shelf_rows with a clien side script 

# YYASDAYSYDYASDYASYD. IT WORKS, IT IS ALIVE 👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏 
## now i only need to add on window resize event lisner
            ```
                <script define:vars={{jsonBooks, bookSizeMinMax}}>

                  const bookCount = jsonBooks.length;
                  function chunkArray(arr, size) {
                    const result = [];
                    for (let i = 0; i < arr.length; i += size) {
                      result.push(arr.slice(i, i + size));
                    }
                    return result;
                  }
                  const booksPerRow = Math.max(
                    1,
                    Math.floor((bookCount * bookSizeMinMax.max_width)/window.innerWidth)
                  );
                  let bookRows = chunkArray(jsonBooks,booksPerRow);
                  let shelfRows = [];

                  const shelf = document.getElementById(`shelf`);
                  for(let row = 0;bookRows.length >row; row++){
                      let bookRow = bookRows[row];
                      shelfRows.push(document.createElement("div"));
                      shelfRows[row].id = `${row}`
                      shelfRows[row].className = `shelfRow`
                      shelfRows[row].style = `
                        border: 5px solid #B65D66;
                      `

                      for(let bookIndex = 0;bookRow.length >bookIndex; bookIndex++){
                        let book = bookRow[bookIndex];
                        const renderedBook = document.getElementById(`${book.uri}`);
                        shelfRows[row].appendChild(renderedBook);
                        console.log(renderedBook)
                      }
                    shelf.appendChild( shelfRows[row]);
                  }
                  console.log(window.innerWidth)
                  console.log(window.innerHeight)

                </script>

            ```
### fix of a bug that leaves empty rows on resize and add event listener on ContentLoaded, btw
            ```

            function removeEmptyRows() {
              const shelf = document.getElementById("shelf");

              [...shelf.children].forEach(node => {
                if (!node.querySelector(".book")) {
                  node.remove();
                }
              });
            }
            window.addEventListener("DOMContentLoaded",() =>{

              setUpShelf()
            })
            window.addEventListener("resize",() =>{

              removeEmptyRows()
              setUpShelf()
            })

            ```

## some progress now all books are align and stand on shelws
## THE PROBLEM: shelfs are half empty the culprit is code bellow
            ```
    const booksPerRow = Math.max(
      1,

      Math.floor((bookCount * bookSizeMinMax.max_width)/window.innerWidth)
    );

    // (bookSizeMinMax.min_width+bookSizeMinMax.max_width)/2)

            ```
##  in this code i bet on the fact that all books on shelw will be MaxSize so they all fit
##  i guess i will count eachBookSize (books are prerenderd) and somehow split it from there
### P.S. i just came up with this solution GO ME!!!!!!🪙🪙🪙🪙
