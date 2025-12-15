# my goal is to get relatively normal(like in printed books about 1800 words per page)
# page count for my books

## WHY: TO RENDER EACH BOOK WITH UNIQE NOT RANDOM SIZE

test book is `All the sinners bleed`

on koreader app that is desired outcom
page count -- font size
    339    --    30

page count -- font size
    746    --    60  
    216    --    30 
    224    --    31
    216    --    30
    201    --    29

i have  746 -- 60 and new font 30 or any other 
and 216 i got from app after changing font size


so far i know:

    console.log(746/60) 
    console.log(224/31) 
    console.log(216/30) 
    console.log(201/29) 
    === 
    12.433333333333334
    7.225806451612903
    7.2
    6.931034482758621
 
    const test = dataDocSizeData.pagesCount / (60/30)
    console.log(test)
    ===
    373.5


## NICE
that result will do now i only need to make it reprodusable for any starting font 
    ```
    ## dataDocSizeData.pagesCount / (CURRERNT_FONT_Size/NEW_FONT_Size)
    const test = dataDocSizeData.pagesCount / (60/30)
    373.5
    ```
for Stephen King -- IT my formula gave me 1722.5 in koreader it is 1339 
need to tune 




that is intrestind allmost my font size fot IT but quite random otherwise
    ```
    ratio = font_size_reflowable/dataDocSizeData.pagesCount
    const test = (dataDocSizeData.pagesCount/ratio) / (dataDocSizeData.pagesCount)
    // IT - 57.41666666666667
    // All the sinners bleed - 12.45
    ```
i think i got it i need to make a proportion 
    take
    test book is `All the sinners bleed`
   Book -- Expected page count -- Wrong page count
  `All the sinners bleed`  --  339    --    746
  `IT`  --  1348    --    3445


so far i'm stuck here but i think i move in right direction,if i 
change in app font real_font ratio is incorrect

    ```
        dataDocSizeDatao:  {ratio: 0.5759577278731837, configHash: 1872426508, page: 436, pagesCount: 758, offsetX: 0, …}
        my_readEra:83 60.00000000000001
        my_readEra:94 (2) [339, 216]
        my_readEra:97 dataDocSizeDatao:  482.9734513274336
        my_readEra:37 dataDocSizeDatao:  {ratio: 0, configHash: 1872426508, page: 0, pagesCount: 747, offsetX: 0, …}
        my_readEra:38 60
        my_readEra:49 (2) [339, 216]
        my_readEra:52 dataDocSizeDatao:  475.9646017699115
    ```

this will have to do so far

    ```
    // only works for IT King 
    // const real_page_count = 1348 
    // const readera_font_dended_page_count = 3445 
    // only works for all the sinner bleed
    const real_page_count = 339 
    const real_page_count = 339 
    let readera_font_dended_page_count = 746 
    //readera_font_dended_page_count =  216
      
    const page_ratio = readera_font_dended_page_count/real_page_count

    const correct_font_size =  Math.round(dataDocSizeData.pagesCount / page_ratio)
    console.log("dataDocSizeDatao: ",correct_font_size)
    ```


main ratio here not tested  
    ```
    const real_page_count = 339 
    let readera_font_dended_page_count = 746 
    const page_ratio = readera_font_dended_page_count/real_page_count

    ```

   Book -- Expected page count -- Calculated
  `All the sinners bleed`  --  339    --    339
  `IT`  --  1348    --     1565
  `Hobbit`  --  327    --     344
  `Shards of honor`  --  253    --     308


## here the final code, i donloaded back up with font 30(in previos tests backup was for 60 font-size) and found 
## out that ReadEra only saves pagesCount once you open book 
## that meand all data is inconsistent cause i changed fonts couple of times

# i ditch this method and will try to get additional data for a books from `https://openlibrary.org`

# THE NEXT DAY
    
## OK, i don't think that API method is that good 
## i'll settle on magic ratio that will work for current font

 ### TODO:
     i will make do with this but the PROBLEM WILL APEAR 
     IF I CHAGE FONT IN READREA APP FROM MY 
     CURRECT 60 real page counts will be a mess
     in addition all books that i opened in app wile having 
     font set to something other than 60
     will have large inacurrasies 
    
    // NOTE: 
    // only works for IT by King 
    // real_page_count = 1348 
    // readera_font_dended_page_count = 3445 
    // result is 2.4 ratio
    // only works for all the sinner bleed
    // result is 2.2 ratio and it almost get real page number 
    // count for most of the books



    ```
    //NOTE: get font size from app
    //const prefsReadEraPath = path.resolve('./src/readEra_backup/prefs.xml');
    //const prefsReadEraXMLText = await fs.readFile(prefsReadEraPath, 'utf-8');
    ---

    <div
      id={json_book.uri}
      class="book"
      style={bookStyle}
    >
      {json_book.data.doc_title} -- {json_book.data.doc_have_read_time}
    </div>

    <script define:vars={{
      json_book, 

      //NOTE: get font size from app
      // prefsReadEraXMLText
    }}>

      const parser = new DOMParser();
      const doc = parser.parseFromString(prefsReadEraXMLText, "text/xml");
     
      //NOTE: get font size from app
      // const font_size_reflowable = 
      // [...doc.getElementsByTagName("String")].find(
      //   (el) => el.getAttribute("name") === "pref_reflowable_font_size").textContent
      
      const book = document.getElementById(`${json_book.uri}`);
      const dataDocSizeData = JSON.parse(json_book.data.doc_position)
      book.addEventListener('click', () => {
        
        // NOTE: 
        // only works for IT by King 
        // real_page_count = 1348 
        // readera_font_dended_page_count = 3445 
        // result is 2.4 ratio
        // only works for all the sinner bleed
        // result is 2.2 ratio and it almost get real page number 
        // count for most of the books
        //
        // TODO:
        // i will make do with this but the PROBLEM WILL APEAR 
        // IF I CHAGE FONT IN READREA APP FROM MY 
        // CURRECT 60 real page counts will be a mess
        // in addition all books that i opened in app wile having 
        // font set to something other than 60
        // will have large inacurrasies 
        const real_page_count = 339 
        let readera_font_dended_page_count = 746 
        // readera_font_dended_page_count =  216
          
        const pages_font_ratio = readera_font_dended_page_count/real_page_count

        const correct_font_size =  Math.round(dataDocSizeData.pagesCount / pages_font_ratio)
        console.log("dataDocSizeDatao: ",correct_font_size)
        });
    </script>

    ```
NOTE: that all the data i have

    ```
        // DATA type
        // {
        //     "uri": "sha-1:842c0a4485103e4f65642b2cc679fc5eb52a05a8",
        //     "data": {
        //         "doc_md5": "2cf113d6b5872889118323775017239d",
        //         "doc_sha1": "842c0a4485103e4f65642b2cc679fc5eb52a05a8", "doc_active": 1,
        //         "doc_format": "EPUB",
        //         "doc_file_name_title": "Slewfoot (Brom) ",
        //         "doc_modified_time": 1759996882950,
        //         "doc_file_size": 1225254,
        //         "doc_title": "Slewfoot",
        //         "doc_authors": "Brom",
        //         "doc_annotation": "Set in Colonial New England, Slewfoot is a tale of magic and mystery, of triumph and terror as only dark fantasist Brom can tell it. \nConnecticut, 1666. \nAn ancient spirit awakens in a dark wood. The wildfolk call him Father, slayer, protector.\nThe colonists call him Slewfoot, demon, devil.\nTo Abitha, a recently widowed outcast, alone and vulnerable in her pious village, he is the only one she can turn to for help. \nTogether, they ignite a battle between pagan and Puritan &#8211; one that threatens to destroy the entire village, leaving nothing but ashes and bloodshed in their wake. \n\"If it is a devil you seek, then it is a devil you shall have!\" \nThis terrifying tale of bewitchery features more than two dozen of Brom's haunting paintings, fully immersing readers in this wild and unforgiving world.\nAt the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
        //         "meta_extra_version": 0,
        //         "file_modified_time": 1759729813000,
        //         "doc_colls_count": 2,
        //         "doc_lang": "en",
        //         "doc_embeded_thumb_version": 1,
        //         "doc_first_page_thumb_version": 0,
        //         "doc_metadata_version": 2,
        //         "doc_embedded_fonts_count": 0,
        //         "doc_vertical_layout": 0,
        //         "doc_delete_time": 0,
        //         "doc_last_read_time": 1759931713876,
        //         "doc_activity_time": 1759931713876,
        //         "doc_favorites_time": 1759996878481,
        //         "doc_have_read_time": 1759996882948,
        //         "doc_to_read_time": 0,
        //         "doc_position": "{\"ratio\":0.0048833423765599565,\"configHash\":-616182448,\"page\":9,\"pagesCount\":1844,\"offsetX\":0,\"offsetY\":0,\"zoom\":1,\"originPage\":-1,\"xPath\":\"\\/body\\/DocFragment[8]\\/body\\/html\\/body\\/section\\/header\\/p\\/text().0\",\"pageEnd\":-1,\"version\":2}",
        //         "doc_bookmarks": "[]",
        //         "doc_search_tips": "[]",
        //         "doc_rating": 0
        //     },
        //     "aliases": [
        //         "size:1225254-1762608346375-24117RN76E"
        //     ],
        //     "bookmarks": [],
        //     "citations": [],
        //     "reviews": [],
        //     "links": []
        // }
    ```

NOTE:  code to get font size
    ```
        //get font size from app
        //server side
        //const prefsReadEraPath = path.resolve('./src/readEra_backup/prefs.xml');
        //const prefsReadEraXMLText = await fs.readFile(prefsReadEraPath, 'utf-8');
        //client side
        // const parser = new DOMParser();
        // const doc = parser.parseFromString(prefsReadEraXMLText, "text/xml");
        // const font_size_reflowable = 
        // [...doc.getElementsByTagName("String")].find(
        //   (el) => el.getAttribute("name") === "pref_reflowable_font_size").textContent

    ```

# DAMN it i could have figured that i will render books on number of pages per pixel  

        ```
        const pages_font_ratio = readera_font_dended_page_count/real_page_count
        const dataDocSizeData = JSON.parse(jsonBook.data.doc_position)
        const correct_number_of_pages =  Math.round(dataDocSizeData.pagesCount / pages_font_ratio)

        ```

# now my fancy ass ratio can be replaced with simple  "page_px_ratio":20 

        ```
        const bookSizeMinMax={
            "page_px_ratio":20,
            "min_height":170,"max_height":200, 
            "min_width":40,"max_width":200, 
            };
        ```
# and final goal is sorta accomplished YAY ME 

        ```
        let book_width = dataDocSizeData.pagesCount/bookSizeMinMax.page_px_ratio;

