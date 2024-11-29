import MenuBar from "./MenuBar";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const HeaderBasic = ({className}) =>{
    return (
        <div className={className}>
            <Logo></Logo>
            <SearchBar></SearchBar>
            <MenuBar></MenuBar>
        </div>
    );
}

export default HeaderBasic;