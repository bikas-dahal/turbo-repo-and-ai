import { Button } from "@workspace/ui/components/button"
import { api } from "@workspace/backend/_generated/api"
import { UserProfile, UserButton, OrganizationSwitcher } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
      <UserProfile /> 
      <UserButton />
      <OrganizationSwitcher hidePersonal />
    </div>
  )
}
