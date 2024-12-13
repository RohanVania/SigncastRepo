import { Request, Response } from "express";
import prismaConnection from "../config/prismaConnectionObject";

type ActionResult<T> = { status: "success", data?: T, message: string } | { status: "error", error: string } | { status: 'pending', data: string, message: string }

export async function TestPrismaCreation() {
    try {
        const res = await prismaConnection.user.create({
            data: {
                age: 123,
                name: "Rihan"
            }
        })
        console.log(res)
    } catch (err) {
        console.log(err);
    }
}


//* Create a File in Database API
/**
 * Creates a new file in the database.
 *
 * This API endpoint expects a `name` and `data` field in the request body.
 * It stores the file in the database using Prisma.
 *
 * @param {Request} req - The HTTP request object, containing the file `name` and `data` in the body.
 * @param {Response} resp - The HTTP response object used to send the result of the operation.
 * 
 * @returns {Promise<void>} Sends a JSON response indicating success or failure.
 *
 * @example
 * // Example request body
 * {
 *   "name": "Sample File",
 *   "data": "This is the file data"
 * }
 * 
  *  // Successful response
 * {
 *   "status": "success",
 *   "message": "File Created successfully"
 * }
 * 
 *  // Error response
 * {
 *   "status": "error",
 *   "error": "Something went wrong"
 * }
 */
export async function CreateFile(req: Request, resp: Response) {
    try {
        const { name, data } = req.body;

        const res = await prismaConnection.file.create({
            data: {
                name: name,
                data: data,
            },
        });

        console.log(res);
        resp.status(200).json({
            status: "success",
            message: "File Created successfully",
        })
    } catch (err) {
        console.error(err);
        resp.status(200).json({
            status: "error",
            error: "Something went wrong",
        })
    }
}


//* Get All Files From Database

/**
 * Get All Files From Database
 *
 * This function retrieves all files stored in the database using Prisma's `findMany` method.
 * If no records are found, it returns an empty array.
 * Otherwise, it provides an array containing the file records.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} resp - The Express response object.
 *
 * @returns {void} - Responds with:
 *  - status: "success", data: [] (if no files exist)
 *  - status: "success", data: [Array of file records] (if files exist)
 *  - status: "error" (if an error occurs)
 *
 * Example of Response:
 *  - Success with no files: { status: "success", data: [] }
 *  - Success with files: { status: "success", data: [{ id: 1, name: "file1" }, { id: 2, name: "file2" }] }
 *  - Error: { status: "error", error: "Something went wrong" }
 */

export async function GetAllFiles(req: Request, resp: Response) {
    try {
        const result = await prismaConnection.file.findMany();
        resp.status(200).json({
            status: 'success',
            data: result
        })
    } catch (err) {
        console.log(err);
        resp.status(400).json({
            status: 'error',
            error: 'Something went wrong'
        })

    }
}