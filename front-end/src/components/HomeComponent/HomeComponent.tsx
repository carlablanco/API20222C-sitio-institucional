import GridComponent from "../GridComponent/GridComponent.lazy";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";

function Home(){
    return(
      <div>
      <NavbarComponent></NavbarComponent>
      <GridComponent></GridComponent>
      </div>
    )
}

export default Home;