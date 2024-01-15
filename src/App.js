import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Timer, Wrapper } from "./pages/Timer";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { SignIn } from "./pages/SignIn";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/timer"
          element={
            <ProtectedRoute>
              <Wrapper></Wrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
