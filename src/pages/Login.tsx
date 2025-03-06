import LoginForm from "@/components/LoginForm"
import { ToastContainer } from "react-toastify"

const Login = () => {
  return (
    <main>
      <div className=''>
        <LoginForm />
      </div>
      <ToastContainer />
    </main>
  )
}

export default Login