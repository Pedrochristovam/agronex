import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type UserRole = "produtor" | "comprador" | "transportador";

export const ROLE_ROUTES: Record<UserRole, string> = {
  produtor: "/cadastro/produtor",
  comprador: "/cadastro/comprador",
  transportador: "/cadastro/transportador",
};
