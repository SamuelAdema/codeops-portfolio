import { useNavigate, useLocation } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    alert("Logged in! Redirecting...");
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Sign In to Continue</h2>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default SignIn;