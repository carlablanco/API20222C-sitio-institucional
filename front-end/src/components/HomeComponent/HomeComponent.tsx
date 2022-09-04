import FormComponent from "../FormComponent/FormComponent";
import GridComponent from "../GridComponent/GridComponent.lazy";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";

function Home(){
    return(
      <div>
      <NavbarComponent></NavbarComponent>
      <FormComponent></FormComponent>
      </div>
    )
}

export default Home;