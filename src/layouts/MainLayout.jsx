import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main style={styles.main}>
        {children}
      </main>

      <Footer />
    </>
  );
};

const styles = {
  main: {
    minHeight: "100vh",
    paddingTop: "70px",
    overflow: "hidden",
  },
};

export default MainLayout;