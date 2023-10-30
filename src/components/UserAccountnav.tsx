
"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

const UserAccount=()=> {
  return (
    <div>
      <Button onClick={() => signOut(
        {
          redirect:true,
          callbackUrl:`${window.location.origin}/sign-in`
        }
      )} variant="destructive">
              Sign out
            </Button>
    </div>
  );
}

export default UserAccount;
