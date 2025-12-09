import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
  '//placekitten.com/1500/500',
  '//placekitten.com/4000/3000',
  '//placekitten.com/800/1200',
  '//placekitten.com/1500/1500',
];

const LightboxGallery = ({picsGallery, photoIndex,
    setPhotoIndex,
    isOpen,
    setIsOpen}) => {
//   const [photoIndex, setPhotoIndex] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

  return (
    <div> 
      {isOpen && (
        <Lightbox
          mainSrc={picsGallery[photoIndex]}
          nextSrc={picsGallery[(photoIndex + 1) % picsGallery.length]}
          prevSrc={picsGallery[(photoIndex + picsGallery.length - 1) % picsGallery.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + picsGallery.length - 1) % picsGallery.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % picsGallery.length)
          }
        />
      )}
    </div>
  );
};

export default LightboxGallery;
