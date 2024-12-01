import MenuBar from "../components/MenuBar";
import Logo from "../components/Logo";

const HeaderBasic = ({className}) =>{
    return (
        <div className="header">
            <Logo></Logo>
            <MenuBar></MenuBar>
        </div>
    );
}

export default HeaderBasic;