import { describe, it, expect, beforeEach } from '@jest/globals'
import { jest } from '@jest/globals'
import type { Chat } from '../../generated/prisma/index.js'

type MockedPrismaChat = {
    create: jest.MockedFunction<(payload: any) => Promise<Chat>>
    findMany: jest.MockedFunction<(arg?: any) => Promise<Pick<Chat, 'id'>[]>>
    findUnique: jest.MockedFunction<(arg: any) => Promise<Chat | null>>
}

const prismaMock: { chat: MockedPrismaChat } = {
    chat: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
    },
}

jest.unstable_mockModule('/src/config/db.ts', () => ({
    default: prismaMock,
}))

const {
    addNewChatService,
    getAllChatService,
    getChatService
} = await import('../chat.js')

const mockedPrisma = prismaMock.chat

describe('Chat service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('addNewChatService', () => {
        it('should create new chat successfully', async () => {
            const mockChatData: Chat = {
                id: 'chat-1',
                user_id: 'user-1',
                persona_id: 2,
                created_at: new Date()
            }

            mockedPrisma.create.mockResolvedValue(mockChatData)

            const result = await addNewChatService({ user_id: 'user-1', persona_id: 2 })

            expect(mockedPrisma.create).toHaveBeenCalledWith({
                data: { user_id: 'user-1', persona_id: 2 },
            })
            expect(result).toHaveProperty('message', 'New Message created')
            expect(result).toHaveProperty('data')
            expect(result.data).toEqual(mockChatData)
        })

        it('should throw error when database fails', async () => {
            mockedPrisma.create.mockRejectedValue(new Error('Database connection failed'))

            await expect(
                addNewChatService({ user_id: 'user-1', persona_id: 2 })
            ).rejects.toThrow('There are something error with server')

            expect(mockedPrisma.create).toHaveBeenCalledWith({
                data: { user_id: 'user-1', persona_id: 2 },
            })
        })
    })

    describe('getAllChatService', () => {
        it('should return list of chats', async () => {
            const mockChatList: Pick<Chat, 'id'>[] = [
                { id: 'chat-1' },
                { id: 'chat-2' }
            ]

            mockedPrisma.findMany.mockResolvedValue(mockChatList)

            const result = await getAllChatService()

            expect(mockedPrisma.findMany).toHaveBeenCalledWith({
                select: { id: true },
            })
            expect(result).toHaveProperty('message', 'Get all chat sucess')
            expect(result).toHaveProperty('data')
            expect(result.data).toEqual(mockChatList)
        })

        it('should throw error when database fails', async () => {
            mockedPrisma.findMany.mockRejectedValue(new Error('Database error'))

            await expect(getAllChatService()).rejects.toThrow('There are something error with server')

            expect(mockedPrisma.findMany).toHaveBeenCalledWith({
                select: { id: true },
            })
        })
    })

    describe('getChatService', () => {
        it('should return chat with persona when found', async () => {
            const mockChatWithPersona = {
                id: 'chat-1',
                user_id: 'user-1',
                persona_id: 1,
                created_at: new Date(),
                Persona: {
                    id: 1,
                    name: 'AI Assistant',
                    systemPrompt: 'You are a helpful assistant'
                }
            }

            mockedPrisma.findUnique.mockResolvedValue(mockChatWithPersona)

            const result = await getChatService('chat-1')

            expect(mockedPrisma.findUnique).toHaveBeenCalledWith({
                where: { id: 'chat-1' },
                include: { Persona: true },
            })
            expect(result).toHaveProperty('message', 'Success get a chat')
            expect(result).toHaveProperty('data')
            expect(result.data).toEqual(mockChatWithPersona)
        })

        it('should return chat data even when not found (null)', async () => {
            mockedPrisma.findUnique.mockResolvedValue(null)

            const result = await getChatService('non-existent-id')

            expect(mockedPrisma.findUnique).toHaveBeenCalledWith({
                where: { id: 'non-existent-id' },
                include: { Persona: true },
            })
            expect(result).toHaveProperty('message', 'Success get a chat')
            expect(result).toHaveProperty('data', null)
        })

        it('should throw error when database fails', async () => {
            mockedPrisma.findUnique.mockRejectedValue(new Error('Database error'))

            await expect(getChatService('chat-1')).rejects.toThrow('There are something error with server')

            expect(mockedPrisma.findUnique).toHaveBeenCalledWith({
                where: { id: 'chat-1' },
                include: { Persona: true },
            })
        })
    })
})