import Image from 'next/image'
import { IoBrowsersOutline, IoCalculator, IoClipboard, IoFootball, IoHeartOutline, IoHome, IoLogoReact, IoNewspaperOutline, IoPersonAddSharp, IoPint, IoPricetag } from 'react-icons/io5'
import { SidebarMenuItem } from './SidebarMenuItem'
import Link from 'next/link'

const menuItems = [
    // {
    //     path: '/dashboard/main',
    //     icon: <IoBrowsersOutline size={40} />,
    //     title: 'Dashboard',
    //     subtitle: 'Visualización'
    // },
    {
        path: '/dashboard/ventas',
        icon: <IoCalculator size={40} />,
        title: 'Ventas',
        subtitle: 'Ventas'
    },
    {
        path: '/dashboard/clientes',
        icon: <IoPersonAddSharp size={40} />,
        title: 'Clientes',
        subtitle: 'Generación Estatica'
    },
    {
        path: '/dashboard/productos',
        icon: <IoPricetag size={40} />,
        title: 'Productos',
        subtitle: 'Global State'
    },
    {
        path: '/dashboard/proveedores',
        icon: <IoClipboard size={40} />,
        title: 'Proveedores',
        subtitle: 'Proveedores'
    },
    {
        path: '/dashboard/vendedores',
        icon: <IoPint size={40} />,
        title: 'Vendedores',
        subtitle: 'Vendedores'
    },
    {
        path: '/dashboard/informe-ventas',
        icon: <IoNewspaperOutline size={40} />,
        title: 'Informe de Ventas',
        subtitle: 'Informe'
    },

]

export const Sidebar = () => {
    return (
        <div
            id="menu"
            style={{ width: '400px' }}
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll">

            <div id="logo" className="my-4 px-6 justify-between">
                <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
                    <IoLogoReact className='mr-2' />
                    <span>XSales</span>
                    <div>
                        <Link href={'/'}>
                            <div className="flex items-center justify-center my-3">
                                <IoHome className='mr-2' />
                            </div>
                        </Link>
                    </div>
                    
                </h1>

                <p className="text-slate-500 text-sm">Sistemas de ventas</p>
            </div>

            <div id="nav" className="w-full px-6">

                {
                    menuItems.map((item) => (
                        <SidebarMenuItem key={item.path} {...item} />
                    ))
                }

            </div>
        </div>
    )
}
