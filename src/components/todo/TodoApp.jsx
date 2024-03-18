import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./TodoApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default function TodoApp() {
  return (
    <>
      <div className="TodoApp">
        <AuthProvider>
          <BrowserRouter>
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route
                path="/logout"
                element={
                  <AuthenticatedRoute>
                    <LogoutComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/welcome/:username"
                element={
                  <AuthenticatedRoute>
                    <WelcomeComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/listTodos"
                element={
                  <AuthenticatedRoute>
                    <ListTodosComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/todo/:id"
                element={
                  <AuthenticatedRoute>
                    <TodoComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
            <FooterComponent />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}
