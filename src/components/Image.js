import { queenImages } from "../assets/images.js"

const Image = ({ queen }) => {

  const id = queen[0];
  const name = queen[1].name;
  const image = queenImages[id];
  return (
    <img src={image} alt={name} />
  )
};

export default Image;