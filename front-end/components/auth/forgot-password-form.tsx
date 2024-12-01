import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordForm() {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Forgot Password</CardTitle>
				<CardDescription>Enter your email to reset your password.</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="Enter your email" />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col">
				<Button className="w-full">Reset Password</Button>
				<div className="mt-4 text-sm text-center text-blue-600 hover:text-blue-500 hover:underline">
					Remember your password?{' '}
					<Link href="/auth/sign-in" className="text-primary hover:underline">
						Sign in
					</Link>
				</div>
			</CardFooter>
		</Card>
	)
}

