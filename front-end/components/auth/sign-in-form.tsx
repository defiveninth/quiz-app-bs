import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInForm() {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>Enter your email and password to sign in to your account.</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="Enter your email" />
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" placeholder="Enter your password" />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col">
				<Button className="w-full">Sign In</Button>
				<div className="mt-4 text-sm text-center space-y-2">
					<Link href="/auth/forgot-password" className="text-blue-600 hover:text-blue-500 hover:underline block">
						Forgot password?
					</Link>
					<div>
						Don't have an account?{' '}
						<Link href="/auth/sign-up" className="text-primary text-blue-600 hover:text-blue-500 hover:underline">
							Sign up
						</Link>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}

