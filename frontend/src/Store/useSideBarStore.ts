import {create } from 'zustand';
import { persist } from 'zustand/middleware';

type SidebarState ={
    collapsed: boolean;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            collapsed: false,
            toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed}))
        }),
        {
            name : 'sidebar-storage', // Nome do armazenamento persistente
        }
    )
)