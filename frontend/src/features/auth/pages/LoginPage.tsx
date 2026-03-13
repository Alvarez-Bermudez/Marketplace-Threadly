import brandImg from "../../../assets/brand.png"
import { login } from "../api"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginInput } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

const LoginPage = () => {
  const navigate = useNavigate()

  const [loginError, setLoginError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/")
    },
    onError: () => {
      setLoginError("Failed to sign in")
    },
  })

  async function onSubmit(data: LoginInput) {
    mutation.mutate(data)
  }

  return (
    <div className="flex h-screen max-h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-103.5 border border-neutral-200 rounded-sm flex flex-col px-7.5 py-8 gap-6 items-center justify-start"
      >
        <img src={brandImg} width={251} height={75} className=""></img>
        <h1 className="inter-500 text-xl text-neutral-900">Sign in</h1>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="email" className="inter-400 text-neutral-900">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="mail@website.com"
                {...register("email")}
                className="text-input"
              />
              {errors.email && <p className="text-sm text-danger-200">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="password" className="inter-400 text-neutral-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Min 8 characters"
                {...register("password")}
                className="text-input"
              />
              {errors.password && <p className="text-sm text-danger-200">{errors.password.message}</p>}
            </div>
          </div>
          <div className="flex justify-start w-full">
            <label className="label">
              <input type="checkbox" defaultChecked className="checkbox checkbox-sm bg-base-100 text-primary-500" />
              <span className="inter-400 text-sm text-neutral-800">Remember me</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className=" w-full py-3 flex items-center justify-center bg-primary-500 rounded-md text-white inter-400 hover:opacity-75 transition-all duration-300"
        >
          Sign in
        </button>

        <p className="inter-400 text-sm">
          <span className="text-neutral-900">Not registered yet?</span>
          <span className="cursor-pointer text-primary-700"> Create an account</span>
        </p>

        {loginError && <p className="text-sm text-danger-200">{loginError}</p>}
      </form>
    </div>
  )
}

export default LoginPage
