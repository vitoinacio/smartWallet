import { CopySlashIcon, LayoutDashboard, LogOut, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const buttonsHeader = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Financeiro",
    url: "/financeiro",
    icon: CopySlashIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const buttonsFooter = [
  {
    title: "LogOut",
    url: "#",
    icon: LogOut,
  },
]
 
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Smart Wallet</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {buttonsHeader.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      <SidebarGroupContent>
            <SidebarMenu>
              {buttonsFooter.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarFooter>
    </Sidebar>
  )
}
