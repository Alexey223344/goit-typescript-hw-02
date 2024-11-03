import { FC } from "react";
import { ApiImage, ModalOpenData } from '../../types';

interface ImgCardProp{
  dataImage:ApiImage
  openModal: (imgUrl: ModalOpenData)=>void
}


const ImageCard: FC<ImgCardProp>= ({ dataImage, openModal }) => {
  const { urls, description, likes } = dataImage;

  return (
    <li>
      <div>
        <img
         
          onClick={() => openModal({ url: urls.full, name: description })}
          src={urls.small}
          alt={description}
        />
      </div>
      <div>
        <p>Likes: {likes} </p>
      </div>
    </li>
  );
};
export default ImageCard;