window.addEventListener("load",function(evt){

    const searchForm = document.querySelector("#searchForm");
    const container = document.querySelector('#container1');


    searchForm.addEventListener('submit',function(event){
        event.preventDefault();
        var userInput = document.querySelector('#query').value;
        const url = 'https://api.vam.ac.uk/v2/objects/search?q='+ encodeURIComponent(userInput);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load",function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                const data = JSON.parse(xhr.responseText);

                while(container.firstChild){
                    container.removeChild(container.lastChild);
                }
                
                for(record of data.records){
                    const objectName = record._primaryTitle;
                    const objectDate = record._primaryDate;
                    
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');
                    
                    const imageElem= document.createElement('img');
                    if (record._images._iiif_image_base_url == null){
                        imageElem.setAttribute('src',"imageNotFound.png");
                    }else{
                        imageElem.setAttribute('src',record._images._iiif_image_base_url + "full/full/0/default.jpg"); 
                    }
                    // imageElem.setAttribute('alt', )   look where alt is in json
                    imageElem.classList.add('objImage');
                    cardDiv.appendChild(imageElem);
                    
                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('objTitle');
                    const titleHeading = document.createElement('h4');
                    titleHeading.textContent = objectName;
                    titleDiv.appendChild(titleHeading);
                    cardDiv.appendChild(titleDiv);

                    const dateDiv = document.createElement('div');
                    dateDiv.classList.add('objDate');
                    const dateHeading = document.createElement('h3');
                    dateHeading.textContent = objectDate;
                    dateDiv.appendChild(dateHeading);
                    cardDiv.appendChild(dateDiv);

                    container1.appendChild(cardDiv);
                }
            
            }else{
                console.log('Status code: ' + xhr.status);
            }
        })

        xhr.open("GET",url,true);
        xhr.send();

    })
});



// console.log(objectName);
// const para = document.createElement('p');
// para.textContent = objectName + "" + objectDate;
// results.appendChild(para);
// title.textContent = objectName;
// results.appendChild(img);

// img.setAttribute('src',item.links[0].href );
// img.setAttribute('alt',item.data[0].description);
// results.appendChild(img);
// console.log(item.data[0].description);
// console.log(item.links[0].href);

