"use client"
import { Button } from "@workspace/ui/components/button"

import { api } from "@workspace/backend/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useVapi } from "@/modules/widget/hooks/use-vapi"

export default function Page() {
  const users = useQuery(api.users.getMany)

  const {isConnected, isSpeaking, isConnecting, transcript, startCall, endCall} = useVapi()

  const addUser = useMutation(api.users.add)
  return (
    <div className="flex bg-gray-500 items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button onClick={() => addUser()}>Add User</Button>
        <Button onClick={() => startCall()}>Start Call</Button>
        <Button onClick={() => endCall()}>End Call</Button>
      </div>
      <div>
        {isConnected ? (
          <div>
            <p>Connected</p>
            <p>Speaking: {isSpeaking ? 'Yes' : 'No'}</p>
            <p>Connecting: {isConnecting ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>Not connected</p>
        )}
      </div>
      <div>
        {transcript.map((message, index) => (
          <div key={index}>
            <p>{message.role}</p>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
