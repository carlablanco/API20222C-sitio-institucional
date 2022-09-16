import { UserResponse } from "../../models/UserResponse";
import FormComponent from "../FormComponent/FormComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";

function Home(){
  const user = sessionStorage.getItem('usuario') as any as UserResponse;
    return(
      <div>
        <NavbarComponent></NavbarComponent>
        <FormComponent></FormComponent>
      </div>
    )
}

export default Home;