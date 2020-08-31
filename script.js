const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let allImagesLoaded = false; 
let totalImages = 0;
let imagesLoaded = 0;
let isInitialLoad = true; 

// Unsplash API
let initialCount = 5; 
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;


function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`
}

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++; 
    if (imagesLoaded === totalImages) {
        allImagesLoaded = true; 
        loader.hidden = true; 
    }
}

// Helper Function To Set Attributes on DOM Elements
function helperSetAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.length; 
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
        // Event Listener, check when each image is finished loading
        img.addEventListener('load', imageLoaded);
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
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(20);
            isInitialLoad = false; 
        }
    } catch (error) {
        // Catch Error Here
    }
}

// Check If Scrolling Near Bottom Of Page, Load More Photos
//1. window.scrollY = distance from top of page user has scrolled.
//2. window.innerHeight = total height of browser window.
//3. document.body.offsetHeight = height of everything in the body, including whatever is not within view.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && allImagesLoaded) {
        allImagesLoaded = false; 
        getPhotos();
    }
});


// On Load
getPhotos(); 