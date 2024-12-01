import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpForm() {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create a new account to get started.</CardDescription>
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
				<Button className="w-full">Sign Up</Button>
				<div className="mt-4 text-sm text-center">
					Already have an account?{' '}
					<Link href="/auth/sign-in" className="text-blue-600 hover:text-blue-500 hover:underline">
						Sign in
					</Link>
				</div>
			</CardFooter>
		</Card>
	)
}

