import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import SearchPage from "./pages/SearchPage";

function App() {
    const { isLoggedIn } = useAppContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <p>Home page</p>
                        </Layout>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <SearchPage/>
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Layout>
                            <SignIn />
                        </Layout>
                    }
                />

                <Route
                    path="/addHotel"
                    element={
                        isLoggedIn ? (
                            <Layout>
                                <AddHotel />
                            </Layout>
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />

                <Route
                    path="/myHotels"
                    element={
                        isLoggedIn ? (
                            <Layout>
                                <MyHotels />
                            </Layout>
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/editHotel/:hotelId"
                    element={
                        isLoggedIn ? (
                            <Layout>
                                <EditHotel />
                            </Layout>
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
