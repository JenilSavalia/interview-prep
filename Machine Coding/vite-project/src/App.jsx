import { BrowserRouter } from "react-router-dom";
import Pagination from "./Pagination"; // default import

function App() {
  return (
    <BrowserRouter>
      <Pagination ItemPerPage={5} />
    </BrowserRouter>
  );
}

export default App
