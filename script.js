const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

// Unsplash API
const countPhotos = 10; 
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countPhotos}`;


// Helper Function To Set Attributes on DOM Elements
function helperSetAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        helperSetAttributes(item, {
            href: photo.links.html, 
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        helperSetAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.setAttribute('src', photo.urls.regular);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json(); 
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check If Scrolling Near Bottom Of Page, Load More Photos
//**NOTES: */
//1. window.scrollY = distance from top of page user has scrolled.
//2. window.innerHeight = total height of browser window.
//3. document.body.offsetHeight = height of everything in the body, including what is not within view.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000) {
        getPhotos();
    }
});



// On Load
getPhotos(); 