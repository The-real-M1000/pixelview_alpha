// movie-details.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Configuración de Firebase (asegúrate de que coincida con tu configuración)
const firebaseConfig = {
    apiKey: "AIzaSyAmHL0-1uJZgPAhxqDN4zA1uXH-X6YtzY",
    authDomain: "pixelview-30.firebaseapp.com",
    projectId: "pixelview-30",
    storageBucket: "pixelview-30.appspot.com",
    messagingSenderId: "267067796738",
    appId: "1:267067796738:web:cadd6fd09b25f94fb5661b",
    measurementId: "G-4VPZX8PV0N"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener los detalles de la película
async function getMovieDetails() {
    const urlParts = window.location.pathname.split('/');
    const movieSlug = urlParts[urlParts.length - 1];
    
    try {
        const docRef = doc(db, "videos", movieSlug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const movieData = docSnap.data();
            updatePageContent(movieData);
        } else {
            console.log("No se encontró la película");
            // Manejar el caso cuando no se encuentra la película
        }
    } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
    }
}

// Función para actualizar el contenido de la página
function updatePageContent(movieData) {
    document.title = `${movieData.title} - PixelView`;
    document.querySelector('.movie-details h1').textContent = movieData.title;
    document.querySelector('.movie-info img').src = movieData.imageUrl;
    document.querySelector('.movie-info img').alt = movieData.title;
    document.querySelector('.info-text p:nth-child(1)').innerHTML = `<strong>Género:</strong> ${movieData.genere}`;
    document.querySelector('.info-text p:nth-child(2)').innerHTML = `<strong>Calificación:</strong> ${movieData.rating}`;
    document.querySelector('.info-text p:nth-child(3)').innerHTML = `<strong>Descripción:</strong> ${movieData.description}`;
    document.querySelector('.impus-dolor p').textContent = movieData.impusDolor;
    document.querySelector('.video-container iframe').src = movieData.videoUrl;
}

// Cargar los detalles de la película cuando se carga la página
document.addEventListener('DOMContentLoaded', getMovieDetails);
