import { useContext, useRef, useState } from "react";
import Layout from "../../components/layout/layout.components";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../context";
const MyAccount = () => {
  const {setAccount} = useContext(ShoppingCartContext)

  const [view, setView] = useState('user-info')
  const [showPassword, setShowPassword] = useState(true);

  const localAccount = localStorage.getItem('account')
  const parsedAccount = JSON.parse(localAccount)
  const form = useRef(null)

  const editAccount = () => {
    const formData = new FormData(form.current)
		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		}

    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    setAccount(data)
  }

  const renderUserInfo = () => {
    return (
      <div className="flex flex-col gap-4 bg-gray-300 p-3 rounded-lg w-96 pt-10">
        <h2 className="flex justify-center text-lg font-bold mb-6" style={{color:"#2f4f4f"}}>My info</h2>
        <div className="flex justify-between gap-1 w-full">
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
        <div className="flex justify-between gap-1 w-full">
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
        <button
            style={{color:"#2f4f4f"}}
            className="border bg-white p-1 rounded-lg font-bold w-full "
            onClick={() => setView('edit-user-info')}>
            Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
        <form ref={form} className='flex flex-col gap-6 w-80'>
            <h1 className="flex justify-center my-10">New Data</h1>
            <div className="flex justify-between gap-1 w-full">
                <label htmlFor="email" ><EnvelopeIcon className="w-8 px-1 font-medium text-white"/></label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={parsedAccount?.email}
                    placeholder="example@gmail.com"
                    className="flex w-full items-center border-2 px-1 rounded-lg font-bold text-sm bg-white  focus:outline-none bg-transparent" 
                    style={{color:"#2f4f4f"}}/>
            </div>
            <div className="flex justify-between gap-1 w-full">
                <label htmlFor="password" ><KeyIcon className="w-8 px-1 font-medium text-white"/></label>
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
            <button
                style={{color:"#2f4f4f"}}
                className="border bg-white p-1 rounded-lg font-bold w-full mt-10"
                onClick={() => {setView('user-info'), editAccount()}}>
                Edit
            </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">My account</h1>
      {renderView()}
    </Layout>
  )
}
export default MyAccount;