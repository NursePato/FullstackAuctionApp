
import Header from "./components/Header/Header";
import "./App.css";
import SearchProvider from "./contexts/SearchProvider";
import AuctionProvider from "./contexts/AuctionProvider";
import UsersProvider from "./contexts/UsersProvider";
import BidsProvider from "./contexts/BidsProvider";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <UsersProvider>
      <Header />
      <Navbar />
      <SearchProvider>
        <AuctionProvider>
          <BidsProvider>
            <AppRoutes />
          </BidsProvider>
        </AuctionProvider>
      </SearchProvider>
    </UsersProvider>
  );
}

export default App;
