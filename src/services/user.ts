import prisma from "../config/db.js";

export async function addUserService(name: string) {
    try {
        // Check existing user name
        const existingUserName = await prisma.user.findUnique({
            where: {
                name: name
            },
            select: {
                id: true
            }
        });

        if (!existingUserName || !existingUserName.id) {
            const userData = await prisma.user.create({
                data: {
                    name
                },
                select: {
                    id: true
                }
            });

            const persona = await prisma.persona.findFirst();

            if (!persona) {
                throw new Error();
            }

            const chat = await prisma.chat.create({
                data: {
                    user_id: userData.id,
                    persona_id: persona.id
                }
            })

            return {
                message: "New user added successfully",
                data: {
                    user_id: userData.id,
                    chat_id: chat.id
                }
            }
        }

        const chat = await prisma.chat.findFirstOrThrow({
            where: {
                user_id: existingUserName.id
            }
        });

        return {
            message: "Log into exsisting user",
            data: {
                user_id: existingUserName.id,
                chat_id: chat?.id
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error("There is something error with server")
    }
}

export async function getAllUserService() {
    try {
        const data = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                created_at: true
            }
        });
        return {
            message: "Get all user success",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There is something error with server")
    }
}

export async function getUserChatService(user_id: string) {
    try {
        const data = await prisma.chat.findMany({
            where: {
                user_id
            },
            include: {
                message_items: {
                    select: {
                        content: true
                    }
                },
                Persona: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return {
            message: "Get user chat success",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There is something error with server");
    }
}