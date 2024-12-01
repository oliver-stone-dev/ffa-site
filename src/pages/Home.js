import SearchBar from "../components/SearchBar";
import HeaderBasic from "../components/HeaderBasic";

const HomePage = () =>{
    return (
        <div>
            <HeaderBasic></HeaderBasic>
            <div className="content">
                <div className="search-banner">
                    <div className="search-container">
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