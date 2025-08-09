import { useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web'

interface TranscriptMessage {
    role: 'user' | 'assistant'
    text: string
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

    useEffect(() => {
        const vapiInstance = new Vapi('74797910-28ce-4cbe-a0ec-b5855a5cd903')
        setVapi(vapiInstance)

        vapiInstance.on('call-start', () => {
            setIsConnected(true)
            setIsConnecting(false)
            setTranscript([])
        })

        vapiInstance.on('call-end', () => {
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        })

        vapiInstance.on('speech-start', () => {
            setIsSpeaking(true)
        })

        vapiInstance.on('speech-end', () => {
            setIsSpeaking(false)
        })

        vapiInstance.on('error', (error: Error) => {
            console.error(error)
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        })

        vapiInstance.on('message', (message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                setTranscript((prev) => [...prev, {
                    role: message.role === 'user' ? 'user' : 'assistant',
                    text: message.transcript
                }])
            }
        })

        return () => {
            vapiInstance?.stop()
        }
    }, [])


    const startCall = () => {
        vapi?.start('f4cd5f30-a276-4a90-9532-1d91c56b629a')
    }

    const endCall = () => {
        vapi?.stop()
    }

    return {
        isConnected,
        isSpeaking,
        isConnecting,
        transcript,
        startCall,
        endCall
    }

}