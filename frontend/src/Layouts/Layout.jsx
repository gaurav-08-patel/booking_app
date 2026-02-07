import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Layout = ({children}) => {
    return <div className="w-screen flex flex-col min-h-screen">
        <Header/>
        <Hero/>
        <div className="flex-1 container mx-auto">
            {children}
        </div>
        <Footer/>
    </div>;
};

export default Layout;
