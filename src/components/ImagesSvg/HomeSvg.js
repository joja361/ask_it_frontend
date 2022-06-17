import image from "../../asset/3.svg";

function HomeSvg() {
  return (
    <div className="w-100 img-container">
      <img
        src={image}
        className="position-absolute home-img d-none d-xxl-block"
      />
    </div>
  );
}

export default HomeSvg;
