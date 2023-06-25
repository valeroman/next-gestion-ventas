import { Section1 } from '@/components'
import { Navbar } from '@/components/home/navbar/Navbar'
import { Section2 } from '@/components/home/sections/Section2'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Section1 />
      <Section2 />

    </>
  )
}
