import { useContext, useRef, useState } from "react";
import Layout from "../../components/layout/layout.components";
import { ShoppingCartContext } from "../../context";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate,  } from "react-router-dom";
const SignIn = () => {
    const {account, setSignOut, setAccount} = useContext(ShoppingCartContext);

    const [view, setView] = useState(false)
    const [showPassword, setShowPassword] = useState("user-info");
    const form = useRef(null);
    const navigate = useNavigate();

    const localAccount = localStorage.getItem("account");
    const parsedAccount = JSON.parse(localAccount);

    const noAccountStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountState = account ? Object.keys(account).length === 0 : true;
    const hasUserAccount = !noAccountStorage || !noAccountState;

    const handleSignIn = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem("sign-out", stringifiedSignOut)
        setSignOut(true)
        return navigate("/", { replace: true });
    }

    const createUser = () => {
        const formData = new FormData(form.current)
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        const stringifiedAccount = JSON.stringify(data);
        localStorage.setItem("account", stringifiedAccount)
        setAccount(data)
        handleSignIn()
    }
    

    const renderLogin = () => {
        return(
            <>
            <div className="flex flex-col gap-4 bg-gray-300 p-3 rounded-lg w-96">
                <h2 className="flex justify-center text-2xl font-bold mb-5" style={{color:"#2f4f4f"}}>Login</h2>
                <p className="flex justify-between gap-1 w-full">
                    <span 
                        className="flex items-center border-2 pr-1 rounded-l-lg font-bold text-sm bg-white" 
                        style={{color:"#2f4f4f", borderColor:"#2f4f4f"}}>
                            <EnvelopeIcon className="w-8 px-1 font-medium"/>
                        Email
                    </span>
                    <span 
                        className="ml-7 pl-4 w-full rounded-r-lg font-bold text-md border" 
                        style={{color:"#2f4f4f", borderColor:"#2f4f4f"}}>
                            {parsedAccount?.email}
                    </span> 
                </p>
                <p className="flex justify-between gap-1 w-full">
                    <span 
                        className="flex items-center border-2 pr-1 rounded-l-lg font-bold text-sm bg-white" 
                        style={{color:"#2f4f4f", borderColor:"#2f4f4f"}}>
                            <KeyIcon className="w-8 px-1 font-medium"/>
                        Password
                    </span>
                    <div className="flex justify-between w-50 border rounded-r-lg" style={{color:"#2f4f4f", borderColor:"#2f4f4f"}}>
                        <input 
                            className="flex w-[80%] pl-4 font-bold text-lg  focus:outline-none bg-transparent"
                            readOnly
                            type={showPassword ? "text" : "password"}
                            value={parsedAccount?.password}
                        />
                        <button
                            style={{backgroundColor:"#2f4f4f"}}
                            className="px-2 rounded-r-lg border"
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeIcon className="w-5 font-bold text-white"/> : <EyeSlashIcon className="w-5 font-bold text-white"/>}
                        </button>
                    </div>
                </p>
                <div className="flex justify-between gap-2 mt-10">
                    <button
                        className="border p-1 rounded-lg font-semibold w-1/2"
                        style={{borderColor:"#2f4f4f",color:"#2f4f4f"}}
                        disabled={hasUserAccount}
                        onClick={() => setView("create-user-info")}
                        >
                        Sign Up
                    </button>
                    <button 
                        className={`border p-1 rounded-lg font-bold text-white w-1/2 ${!hasUserAccount ? "opacity-30" : null }`}
                        style={{borderColor:"#2f4f4f", backgroundColor:"#2f4f4f"}}
                        disabled={!hasUserAccount}
                        onClick={() => handleSignIn()}>
                        Login
                    </button>
                </div>
            </div>
            </>
        )
    }
    const renderCreateUser = () =>{
        return(
            <>
            <div className="flex flex-col gap-4 bg-gray-300 p-3 rounded-lg w-96">
                <h2 className="flex justify-center text-2xl font-bold mb-5" style={{color:"#2f4f4f"}}>Create account</h2>
                <form ref={form} className="flex  flex-col gap-4">
                    <div className="flex">    
                        <label htmlFor="email" ><EnvelopeIcon className="w-8 px-1 font-medium"/></label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={parsedAccount?.email}
                            placeholder="example@gmail.com"
                            className="flex w-full items-center border-2 px-1 rounded-lg font-bold text-sm bg-white  focus:outline-none bg-transparent" 
                            style={{color:"#2f4f4f"}}/>
                    </div>
                    <div className="flex">
                        <label htmlFor="password" ><KeyIcon className="w-8 px-1 font-medium"/></label>
                        <input 
                            id="password"
                            name="password"
                            defaultValue={parsedAccount?.password}
                            placeholder="*******"
                            className="flex w-full items-center border-2 px-1 rounded-l-lg font-bold text-sm bg-white  focus:outline-none bg-transparent"
                            type={!showPassword ? "text" : "password"}
                        />
                        <button
                            type="button"
                            style={{backgroundColor:"#2f4f4f"}}
                            className="px-2 rounded-r-lg border"
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <EyeIcon className="w-5 font-bold text-white"/> : <EyeSlashIcon className="w-5 font-bold text-white"/>}
                        </button>
                    </div>
                    <Link to="/" className="mt-10">
                        <button
                            type="submit" 
                            style={{color:"#2f4f4f"}}
                            onClick={()=>createUser()}
                            className="border bg-white p-1 rounded-lg font-bold w-full ">
                            Create
                        </button>
                    </Link>
                </form>
              
                
                
            </div>
            </>
        )
    }
    const renderView = () => view === "create-user-info" ? renderCreateUser() : renderLogin();
    
    return(
        <Layout>
            <h1 className="mb-10">Wellcome</h1>
            {renderView()}
        </Layout>
    )
}
export default SignIn;