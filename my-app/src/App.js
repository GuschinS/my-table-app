import React from 'react';
import Table from "./components/Table";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
    const rowsPerPage = 10;
    const [redirectToPage, setRedirectToPage] = React.useState(false);
    const pageNumberToRedirect = 1;

    React.useEffect(() => {
        setRedirectToPage(true);
    }, []);

    return (
        <Router>
            <div className="container mt-4">
                <Routes>
                    {redirectToPage && <Route path="my-table-app" element={<Navigate to={`/page/${pageNumberToRedirect}`} />} />}
                    <Route path="/page/:pageNumber" element={<Table rowsPerPage={rowsPerPage}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
