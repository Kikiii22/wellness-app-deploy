"use client"

import { BarChart3, Brain, Heart, Home, LogOut, Play, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { logoutAction } from "@/lib/actions"
import type { User as UserType } from "@/lib/db"

const menuItems = [
  {
    title: "Почетна страна",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Дневен прашалник",
    icon: Brain,
    id: "questionnaire",
  },
  {
    title: "Дневно расположение",
    icon: Heart,
    id: "feeling",
  },
  {
    title: "Видеа",
    icon: Play,
    id: "videos",
  },
  {
    title: "Извештај ",
    icon: BarChart3,
    id: "analysis",
  },
]

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  user: UserType
}

export function AppSidebar({ currentPage, onPageChange, user }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <img src="/Pastel Colors Lotus Yoga Studio Logo.png" alt="Balance Logo" className="h-15 w-15 object-contain" />

          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Баланс</span>
            <span className="truncate text-xs text-muted-foreground">Најдобра верзија од себе</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Мени</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onPageChange(item.id)} isActive={currentPage === item.id}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User />
              <span>{user.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form action={logoutAction}>
              <Button variant="ghost" className="w-full justify-start" size="sm" type="submit">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
