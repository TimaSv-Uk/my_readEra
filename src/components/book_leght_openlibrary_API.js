// NOTE:
// good try GEMINI but not quite, not a lot of book are found that whay

async function getRealPageCount(title, author) {
    // 1. Clean up the query
    const query = `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
    const url = `https://openlibrary.org/search.json?${query}&fields=number_of_pages_median,title`;
    console.log(url)

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.docs && data.docs.length > 0) {
            const book = data.docs[0];
            
            if (book.number_of_pages_median) {
                return book.number_of_pages_median;
            }
        }
        
        console.warn("Book found, but no page count available.");
        return null;

    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
getRealPageCount(json_book.data.doc_title, json_book.data.doc_authors).then(realPages => {
    if (realPages) {
        console.log("-----")
        console.log(json_book.data.doc_title, json_book.data.doc_author)
        console.log("Real Physical Pages:", realPages);

    }
});
