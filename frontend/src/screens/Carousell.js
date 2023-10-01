import Carousel from 'react-bootstrap/Carousel';
import img1 from './car1.png' 
import img2 from './car2.png' 
import img3 from './car3.png' 
function Carousell() {
  return (
    <Carousel data-bs-theme="dark" >
      <Carousel.Item >
        <img
          className="mx-auto d-block w-10"
          src={img1}
          alt="First slide"
          
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="mx-auto d-block w-10"
          src={img2}
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="mx-auto d-block w-10"
          src={img3}
          alt="Third slide"
        />
       
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousell;