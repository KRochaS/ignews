import "next-auth";

declare module "next-auth" {
  interface Session {
    activeSubscription: string | null;
  }
}