"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="items-center">
            <Link href='/create-match'>
            <SidebarMenuButton
              tooltip="Create Match"
              className="w-contain bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff4d88] transition"
            >
              <IconCirclePlusFilled />
              <span>Create Match</span>
            </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          
      {items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} passHref>
            <SidebarMenuButton
              tooltip={item.title}
              className={isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground duration-200 ease-linear' : 'text-muted-foreground'}
            >
              {item.icon && <item.icon className="mr-2" />}
              <span>{item.title}</span>
            </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
