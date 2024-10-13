import { useState, useEffect } from "react";
import './App.css';
import Header from './Component/Header'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function randomSize() {
  return Math.floor(350 + Math.random() * 100) + "px";
}

function App() {
  const [photos, setPhotos] = useState([]); 

  const getPhotos = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=45496333-3fa1d67e86f676313d5f86f45&q=galaxy&image_type=photo`
      );
      const data = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...data.hits]); 
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    getPhotos(); 

    const handleScroll = () => {
      if (window.scrollY + window.innerHeight + 100 >= document.body.offsetHeight) {
        getPhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <div className="box">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo.largeImageURL}
            alt="Galaxy"
            style={{ height: randomSize(), width: randomSize() }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
