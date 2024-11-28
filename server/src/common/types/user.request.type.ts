import { Types } from "mongoose";

export interface UserRequestType {
    _id: Types.ObjectId
    email: string
}