import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from './components/Header';
import Home from "./pages/Home";
import Contact from './pages/Contact';
import About from './pages/About';

import Signup from './pages/Signup';
import Login from './pages/Login';
import OtpVerification from "./pages/OtpVerification";

import InsertionSort from "./components/InsertionSort.jsx";
import MergeSort from "./components/MergeSort.jsx";
import BubbleSort from "./components/BubbleSort.jsx";
import SelectionSort from "./components/SelectionSort.jsx";
import HeapSort from "./components/HeapSort.jsx";
import Dijkstra from "./components/Dijkstra.jsx";
import QuickSort from "./components/QuickSort.jsx";
import BFS from './components/BFS.jsx';
import DFS from './components/DFS.jsx';

import ProtectedRoute from './utils/ProtectedRoute.jsx'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpverification" element={<OtpVerification />} />

          <Route path="/dijkstra" element={
            <ProtectedRoute>
              <Dijkstra />
            </ProtectedRoute>
          } />
          <Route path="/quick-sort" element={
            <ProtectedRoute>
              <QuickSort />
            </ProtectedRoute>
          } />
          <Route path="/merge-sort" element={
            <ProtectedRoute>
              <MergeSort />
            </ProtectedRoute>
          } />
          <Route path="/insertion-sort" element={
            <ProtectedRoute>
              <InsertionSort />
            </ProtectedRoute>
          } />
          <Route path="/bubble-sort" element={
            <ProtectedRoute>
              <BubbleSort />
            </ProtectedRoute>
          } />
          <Route path="/selection-sort" element={
            <ProtectedRoute>
              <SelectionSort />
            </ProtectedRoute>
          } />
          <Route path="/heap-sort" element={
            <ProtectedRoute>
              <HeapSort />
            </ProtectedRoute>
          } />
          <Route path="/bfs" element={
            <ProtectedRoute>
              <BFS />
            </ProtectedRoute>
          } />
          <Route path="/dfs" element={
            <ProtectedRoute>
              <DFS />
            </ProtectedRoute>
          } />

      </Routes>
      <ToastContainer /> 
    </Router>
  );
}

export default App;
