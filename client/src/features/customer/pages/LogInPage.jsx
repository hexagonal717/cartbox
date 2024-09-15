import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@/api/v1/customer/customerApi.js"
import { addCartItem } from "@/api/v1/customer/cart/cartActions.js"
import { ClearGuestCart } from "@/features/customer/redux/cart/guestCartSlice.js"
import { Button } from "@/components/ui-custom/button"
import { Input } from "@/components/ui-custom/input"
import { Label } from "@/components/ui-custom/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui-custom/card"
import { Alert, AlertDescription } from "@/components/ui-custom/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const guestCart = useSelector((state) => state.guestCartSlice.cart)

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const transferGuestCart = async (customerId) => {
    if (guestCart?.items?.length > 0) {
      try {
        const addItemPromises = guestCart.items.map((item) => {
          return dispatch(addCartItem({
            productId: item._id,
            customerId: customerId,
            quantity: item.quantity,
          }))
        })

        await Promise.all(addItemPromises)
      } catch (error) {
        console.error("Error while transferring guest cart items:", error)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    try {
      const res = await login(credentials, dispatch)
      if (res?.status === "success" && res && res.customerId) {
        await transferGuestCart(res.customerId)
        dispatch(ClearGuestCart())
        navigate("/")
      } else {
        setError("Login successful but customerId not received")
      }
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.")
    }
  }

  function handleCredentials(event) {
    const { name, value } = event.target
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  return (
    <div className="flex dark:bg-neutral-950 h-screen items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full border-0 sm:border max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleCredentials}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleCredentials}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="mt-4 text-center text-sm">
            <Link to={`/forgot-password`} className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Want to create an account?
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link to={`/signup`}>Sign up</Link>
          </Button>
          <div className="text-center text-xs">
            Are you an{" "}
            <Link to={`/admin-login`} className="font-semibold text-primary hover:underline">
              admin
            </Link>
            ?
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}