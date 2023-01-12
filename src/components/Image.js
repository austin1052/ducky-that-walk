const Image = ({ id, name }) => {
  try {
    // Import image on demand
    const image = require(`assets/${id}`);

    // If the image doesn't exist. return null
    if (!image) return null;
    return <img src={image.default} alt={name} />;
  } catch (error) {
    console.log(`Image with name "${name}" does not exist`);
    return null;
  }
};

export default Image;