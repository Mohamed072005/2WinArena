import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

interface Errors {
    email?: string
    password?: string
}

interface LoginFormProps {
    errors: Errors
    handelSubmitForm: (event: React.FormEvent) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ handelSubmitForm, errors }) => {
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
            <div className="w-full max-w-md mx-auto">
                <form onSubmit={(event) => handelSubmitForm(event)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
                        <div className="relative group">
                            <Input
                                id="email"
                                placeholder="Enter your email"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="pl-10 pr-4 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md transition duration-150 ease-in-out"
                            />
                            <Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 transition-colors duration-150 ease-in-out group-focus-within:text-indigo-500" />
                        </div>
                        {errors?.email && <span className="text-red-500">{errors.email}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
                        <div className="relative group">
                            <Input
                                id="password"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                autoCapitalize="none"
                                autoComplete="current-password"
                                disabled={isLoading}
                                className="pl-10 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm rounded-md transition duration-150 ease-in-out"
                            />
                            <Lock className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 transition-colors duration-150 ease-in-out group-focus-within:text-indigo-500" />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1/2 h-8 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors duration-150 ease-in-out"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                </span>
                            </Button>
                        </div>
                        {errors?.password && <span className="text-red-500">{errors.password}</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                            className="text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm text-gray-700 dark:text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transform transition duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : "Sign In"}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default LoginForm;
