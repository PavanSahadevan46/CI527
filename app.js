window.addEventListener("load",function(evt){
    const q7button = document.querySelector("#btn1");
    q7button.addEventListener('click',function(evt){
    
        //get input from search
       var search = "Apollo 11";
       
       //construct url
       //https://images-api.nasa.gov/search?q=Apollo%2011&media_type=image
       
        const url = 'https://images-api.nasa.gov/search?q=Apollo%2011&media_type=image&q=' + encodeURIComponent(search);

        console.log(url);

        var xhr = new XMLHttpRequest;
        xhr.addEventListener("load",function(){
            if(xhr.status == 200){
                // console.log(xhr.responseText);
                const results = document.querySelector("#results");
                const data = JSON.parse(xhr.responseText);
                for(item of data.collection.items){

                    // console.log(item.data[0].title);
                    // console.log(item.data[0].description);
                    // console.log(item.links[0].href);

                    const img = document.createElement('img');
                    img.setAttribute('src',item.links[0].href );
                    img.setAttribute('alt',item.data[0].description);
                    results.appendChild(img);



                }
            }else{
                console.log('Status code: ' + xhr.status);
            }
        })

        xhr.open("GET",url,true);
        xhr.send();

    })
})