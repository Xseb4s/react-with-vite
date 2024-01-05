import { useContext, useState } from "react";
import Layout from "../../components/layout/layout.components";
import { ShoppingCartContext } from "../../context";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {account} = useContext(ShoppingCartContext);

    const localAccount = localStorage.getItem("account");
    const parsedAccount = JSON.parse(localAccount);

    const noAccountStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountState = account ? Object.keys(account).length === 0 : true;
    const hasUserAccount = !noAccountStorage || !noAccountState;
    console.log(hasUserAccount, parsedAccount)

    return(
        <Layout>
            <h1 className="mb-10">Sign In</h1>
            <div className="flex flex-col gap-4 bg-gray-300 p-3 rounded-lg w-96">
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
                            style={{}}
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
                        disabled={hasUserAccount}>
                        Sign Up
                    </button>
                    <button 
                        className={`border p-1 rounded-lg font-bold text-white w-1/2 ${!hasUserAccount ? "opacity-30" : null }`}
                        style={{borderColor:"#2f4f4f", backgroundColor:"#2f4f4f"}}
                        disabled={!hasUserAccount}>
                        Login
                    </button>
                </div>
            </div>
        </Layout>
    )
}
export default SignIn;