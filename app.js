window.addEventListener("load",function(evt){

    const searchForm = document.querySelector("#searchForm");
    searchForm.addEventListener('submit',function(event){
        event.preventDefault();
        var userInput = document.querySelector('#query').value;
        const url = 'https://api.vam.ac.uk/v2/objects/search?q='     + encodeURIComponent(userInput);
        var xhr = new XMLHttpRequest;
        xhr.addEventListener("load",function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                const results = document.querySelector("#results");
                const data = JSON.parse(xhr.responseText);
                for(record of data.records){
                    const objectName = record._primaryTitle;
                    const objectDate = record._primaryDate;
                    // console.log(objectName);
                    const para = document.createElement('p');
                    para.textContent = objectName + "" + objectDate;
                    results.appendChild(para);
                    const img = document.createElement('img');
                    img.setAttribute('src',record._images._primary_thumbnail);
                    results.appendChild(img);




                }
            }else{
                console.log('Status code: ' + xhr.status);
            }
        })

        xhr.open("GET",url,true);
        xhr.send();

    })
});




















// img.setAttribute('src',item.links[0].href );
// img.setAttribute('alt',item.data[0].description);
// results.appendChild(img);
// console.log(item.data[0].description);
// console.log(item.links[0].href);

