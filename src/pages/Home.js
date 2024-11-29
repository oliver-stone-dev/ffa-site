import SearchBar from "../components/SearchBar";
import HeaderBasic from "../components/HeaderBasic";

const HomePage = () =>{
    return (
        <div>
            <HeaderBasic className="header"></HeaderBasic>
            <div className="content">
                <div className="searchBanner">
                    <div className="searchContainer">
                        <h1>flying with film?</h1>
                        <h3>lets see if your airport is film friendly!</h3>
                        <SearchBar></SearchBar>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>privacy policy</p>
            </div>
        </div>
    );
}

export default HomePage;