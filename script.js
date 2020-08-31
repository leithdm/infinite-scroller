//Unsplash API
const countPhotos = 10; 
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countPhotos}`;


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json(); 
        console.log(data);
    } catch (error) {
        // Catch Error Here
    }
}

// On Load
getPhotos(); 