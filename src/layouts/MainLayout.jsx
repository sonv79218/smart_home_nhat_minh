import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingContactButtons from "../components/layout/FloatingContactButtons";
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-[65px] overflow-visible">
        {children}
      </main>

      <Footer />
      <FloatingContactButtons />
    </div>
  );
};

export default MainLayout;
