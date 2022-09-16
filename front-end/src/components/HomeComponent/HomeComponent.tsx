import FormComponent from "../FormComponent/FormComponent";
import GridComponent from "../GridComponent/GridComponent.lazy";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";
import FooterComponent from "../FooterComponent/FooterComponent.lazy";

function Home(){
    return(
      <div>
      <NavbarComponent></NavbarComponent>
      <FormComponent></FormComponent>
      <FooterComponent></FooterComponent>
      </div>
    )
}

export default Home;