export interface MenuItem {
  routerLink?: string;
  onclick?: () => void;
  label: string;
  icon?: string;
  header?: boolean;
  children?: MenuItem[];
}
