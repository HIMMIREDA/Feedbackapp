import Header from "./components/Header";

import FeedbackList from "./components/FeedbackList";

import FeedbackStats from "./components/FeedbackStats";

import FeedbackForm from "./components/FeedbackForm";

import AboutPage from "./pages/AboutPage";

import AboutIconLink from "./components/AboutIconLink";

import {BrowserRouter as Router, Route,Routes} from "react-router-dom";

import { FeedbackProvider } from "./context/FeedbackContext";

import Spinner from "./components/shared/Spinner";




function App(){
    
    
    
    return (
        <FeedbackProvider>
        <Router>
            <Header />
            <div className="container">
                <Routes>

                    <Route path="/"
                    element={
                        <>

                        <FeedbackForm />
                        <FeedbackStats />
                        <FeedbackList />
                        <Spinner/>
                        <AboutIconLink/>
                        </>
                    }
                    />

                    <Route path="/about" element={<AboutPage/>}/>
                    
                </Routes>
                
            </div>
        </Router>
        </FeedbackProvider>
    );
        


}

export default App;