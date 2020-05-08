export interface MenuItem {
  routerLink?: string;
  label: string;
  icon?: string;
  header?: boolean;
  children?: MenuItem[];
}
