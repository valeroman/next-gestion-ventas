import { ActiveLink } from "@/components";
import Link from "next/link";
import { IoBrowsersOutline } from 'react-icons/io5'
// import { ActiveLink } from "../active-link/ActiveLink";


const navItems = [
    { path: '/dashboard/ventas', text: 'Dashboard' },
    { path: '/auth', text: 'Login' },
]

export const Navbar = () => {
  return (
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded">

        <Link href={'/'} className=" flex items-center">
            <IoBrowsersOutline className="mr-2"/>
            <span>Home</span>
        </Link>

        <div className="flex flex-1"></div>

        {
            navItems.map((navItem) => (
                <ActiveLink key={ navItem.path } { ...navItem } />
            ))
        }
    </nav>
  )
}
