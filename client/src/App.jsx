import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "./auth/forms/SignInForm";
import SignUpForm from "./auth/forms/SignUpForm";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewsArticles from "./pages/NewsArticles";
import Header from "./components/shared/Header";
import { Toaster } from "react-hot-toast";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/news" element={<NewsArticles />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
