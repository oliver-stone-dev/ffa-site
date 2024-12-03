import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import reportWebVitals from './testing/reportWebVitals';
import SearchBar from './components/SearchBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import AiportPage from './pages/Airport';
import WriteReviewPage from './pages/WriteReview';
import ReviewsPage from './pages/Reviews';
import AboutPage from './pages/About';
import AuthPage from './pages/Auth';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/airports/:id" element={<AiportPage/>}></Route>
        <Route path="/airports/:id/reviews" element={<ReviewsPage/>}></Route>
        <Route path="/airports/:id/writereview" element={<WriteReviewPage/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/auth" element={<AuthPage/>}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
