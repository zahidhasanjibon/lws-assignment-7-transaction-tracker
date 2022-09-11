import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import AllTransactionList from "./components/Transactions/AllTransactionList";
import Transactions from "./components/Transactions/Transactions";

function App() {
    return (
        <Router>
         <Routes>
            <Route path="/" element={  <Layout>
            <Balance />
            <Form />
            <Transactions />
        </Layout>} />
        <Route path="/alltransaction" element={<Layout>

            <AllTransactionList />

        </Layout>} />
        </Routes>
        </Router>
    );
}

export default App;
