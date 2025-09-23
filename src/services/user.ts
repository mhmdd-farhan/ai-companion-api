import prisma from "../config/db.js";

export async function addUserService(name: string) {
    try {
        // Check existing user name
        const existingUserName = await prisma.user.findFirst({
            where: {
                name: name
            },
            select: {
                id: true
            }
        });

        if (!existingUserName) {
            const userData = await prisma.user.create({
                data: {
                    name
                },
                select: {
                    id: true
                }
            });

            return {
                message: "New user added successfully",
                data: {
                    user_id: userData.id
                }
            }
        }

        return {
            message: "Log into exsisting user",
            data: {
                user_id: existingUserName.id
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error("There is something error with server")
    }
}