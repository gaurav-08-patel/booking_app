import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

const Layout = ({ children }) => {
    return (
        <div className="w-screen flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto -mt-13 mb-5">
                <SearchBar />
            </div>
            <div className="flex-1 container mx-auto">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
