import { Building2, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    section: "Gerenciamento",
  },
  {
    title: "Empresas",
    url: "/empresas",
    icon: Building2,
    section: "Gerenciamento",
  },
  {
    title: "Logs",
    url: "/logs",
    icon: FileText,
    section: "Sincronização",
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
    section: "Sistema",
  },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src="/sankhya-logo-horizontal.png" alt="Sankhya" className="h-10 brightness-0 invert" />
        </div>
        <p className="text-xs text-sidebar-foreground/60 mt-2">Sincronização Oracle</p>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(groupedItems).map(([section, items]) => (
          <SidebarGroup key={section}>
            <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-wide">
              {section}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      data-testid={`link-${item.title.toLowerCase()}`}
                      onClick={() => setLocation(item.url)}
                    >
                      <a href={item.url} className="flex items-center gap-3 px-6 py-3">
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-6 py-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover-elevate active-elevate-2"
          data-testid="button-logout"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
