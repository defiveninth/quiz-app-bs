'use client'

import MyAccordion from '@/components/custom/accordion'
import MyAlert from '@/components/custom/alert'
import MyAvatar from '@/components/custom/avatar'
import MyDialog from '@/components/custom/dialog'
import { ThemeSwitchButton } from '@/components/theme/switch-button'
import { Badge } from '@/components/ui/badge'

export default function TESTPAGE() {
  return (
    <>
      <div className='container mx-auto min-h-screen px-5 pb-5'>
        <h1 className='font-bold text-3xl my-5'>My Accordion</h1>
        <MyAccordion className='mx-5' />
        <h1 className='font-bold text-3xl my-5'>My Alert</h1>
        <MyAlert variant='default' />
        <h1 className='font-bold text-3xl my-5'>My Dialog</h1>
        <MyDialog />
        <h1 className='font-bold text-3xl my-5'>My Avatar</h1>
        <MyAvatar />
        <h1 className='font-bold text-3xl my-5'>My Badge</h1>
        <Badge variant={'default'} className='bg-[#1da1f2] text-white '>Low</Badge>
        <h1 className='font-bold text-3xl my-5'>Theme Toggle Button</h1>
        <ThemeSwitchButton />
      </div>
    </>
  )
}
