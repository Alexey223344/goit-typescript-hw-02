import ImageCard from '../ImageCard/ImageCard';
import { ApiImage, ModalOpenData } from '../../types';
import { FC } from 'react';

interface ImgGalleryProp{
  dataImage:  ApiImage[];
  openModal:(imgUrl:ModalOpenData)=>void
}

const ImageGallery: FC<ImgGalleryProp> = ({ dataImage, openModal }) => {
  return (
    <ul>
      {dataImage.map((item:ApiImage) => (
        <ImageCard key={item.id} dataImage={item} openModal={openModal} />
      ))}
    </ul>
  );
};
export default ImageGallery;