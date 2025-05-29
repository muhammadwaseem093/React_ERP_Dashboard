import Header from './Header';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <>
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-1 overflow-hidden">
                <SidebarLeft/>
                <main className="flex-1 overflow-auto bg-gray-100 p-4">{children}</main>
                <SidebarRight/>
            </div>
        </div>
        </>
    )
}