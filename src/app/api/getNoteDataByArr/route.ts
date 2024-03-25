import { NextResponse } from "next/server";
import { categoryToDirMap } from '@/utils/getFIleAndData'
import { getAllNotesData, getCategory, getNoteDataByArr } from "@/utils/dataUtil";
export async function POST(req: Request) {
    const arr = await req.json()
    const allNotesData = getNoteDataByArr(arr)
    return NextResponse.json({ data: allNotesData }, { status: 200 })
}