import { useState } from 'react'
import { LogOut, Menu, PlusCircle, X } from 'lucide-react'
import { ThemeSwitchButton } from '../theme/switch-button'
import { Button } from '../ui/button'
import { CreateQuizForm } from '../modal/create-quiz-form'

export default function Header() {
	const [mobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Quiz Dashboard</h1>
				<Button onClick={() => setIsMobileMenuOpen(!mobileMenuOpen)} className='sm:hidden'>
					{mobileMenuOpen ? <X /> : <Menu />}
				</Button>
				<div className="flex items-center justify-between space-x-4 max-sm:hidden">
					<ThemeSwitchButton />
					<CreateQuizForm />
					<div className='flex items-center border-b-2 border-black rounded-lg'>
						<span className='font-medium mx-2'>Sakenov Abdurrauf</span>
						<Button variant={'default'}>
							<LogOut />
						</Button>
					</div>
				</div>
			</div>

			{
				mobileMenuOpen && (
					<div className='flex flex-col gap-3 mb-5 sm:hidden'>
						<div className='flex justify-between items-center border-2 border-black rounded-lg'>
							<span className='font-medium text-lg ml-5'>Sakenov Abdurrauf</span>
							<Button variant={'default'}>
								<LogOut />
							</Button>
						</div>
						<CreateQuizForm />
						<div className='flex justify-between items-center border-2 border-black rounded-lg'>
							<span className='font-medium text-lg ml-5'>Switch Theme</span>
							<ThemeSwitchButton />
						</div>
					</div>
				)
			}
		</>

	)
}
