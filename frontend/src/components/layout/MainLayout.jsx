/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Drawer from './Drawer';
import BottomNav from './BottomNav';
import Footer from './Footer';
import SearchModal from './SearchModal';

export default function MainLayout() {
    return (
            <div className="min-h-screen flex flex-col bg-cremlg text-slate-800 antialiased">
                <Header />
                <Drawer />
                <SearchModal />
                <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6">
                    <Outlet />
                </main>
                <BottomNav />
                <Footer />
            </div>
            );
}
