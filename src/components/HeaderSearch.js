import MenuBar from "./MenuBar";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const HeaderSearch = () =>{

    const customStyle = {
        width: '30%'
    };

    return (
        <div className="header">
            <Logo></Logo>
            <SearchBar style={customStyle}></SearchBar>
            <MenuBar></MenuBar>
        </div>
    );
}

export default HeaderSearch;