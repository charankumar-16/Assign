import React from 'react';

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <img src={image.urls.small} alt={image.alt_description} />
      <div className="image-details">
        <p>{image.alt_description}</p>
        <a href={image.links.html} target="_blank" rel="noopener noreferrer">
          View on Unsplash
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
