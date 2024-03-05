window.addEventListener("load", (evt) => {

    const searchForm = document.querySelector(".searchForm");
    const container = document.querySelector('.container1');
    const loadingIcon = document.querySelector(".lds-dual-ring");
    const inputValidation = document.querySelector('.inputValidation');
    inputValidation.classList.add("hidden");



    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        var userInput = document.querySelector('#query').value;
        const url = 'https://api.vam.ac.uk/v2/objects/search?&q=' + encodeURIComponent(userInput);
        if (userInput == "") {
            inputValidation.classList.remove("hidden");
        } else {
            loadingIcon.classList.remove("hidden");
            inputValidation.classList.add("hidden");
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.log("Status code: " + response.status)
                }
                const data = await response.json();
                console.log(data);

                if (data == null) {
                    console.log("No results found!");
                }


                while (container.firstChild) {
                    container.removeChild(container.lastChild);
                }
                for (record of data.records) {
                    const objectName = record._primaryTitle;
                    const objectDate = record._primaryDate;

                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    const imageElem = document.createElement('img');
                    if (record._images._iiif_image_base_url == null) {
                        imageElem.setAttribute('src', "imageNotFound.png");
                    } else {
                        imageElem.setAttribute('src', record._images._iiif_image_base_url + "full/full/0/default.jpg");
                    }
                    // imageElem.setAttribute('alt', )   look where alt is in json
                    imageElem.classList.add('objImage');
                    cardDiv.appendChild(imageElem);

                    const titleDiv = document.createElement('div');
                    const titleHeading = document.createElement('h4');
                    titleDiv.classList.add('objTitle');
                    titleHeading.classList.add('titleHeading');
                    titleHeading.textContent = objectName;
                    titleDiv.appendChild(titleHeading);
                    cardDiv.appendChild(titleDiv);

                    const dateDiv = document.createElement('div');
                    const dateHeading = document.createElement('h3');
                    dateHeading.classList.add("dateHeading");
                    dateDiv.classList.add('objDate');
                    dateHeading.textContent = objectDate;
                    dateDiv.appendChild(dateHeading);
                    cardDiv.appendChild(dateDiv);

                    container.appendChild(cardDiv);
                }
            } catch (error) {
                console.log(error);
            } finally {
                loadingIcon.classList.add("hidden");
            }
        }

    });
});


