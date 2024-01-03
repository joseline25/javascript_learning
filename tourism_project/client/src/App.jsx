import React from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    // Fetch the touristic site pictures from the backend
    axios
      .get('/api/pictures')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Touristic Site Pictures</h1>
      <div>
        {images.map((image) => (
          <img key={image._id} src={image.url} alt={image.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
