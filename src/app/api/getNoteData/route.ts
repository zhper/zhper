import { NextResponse } from "next/server";
import { categoryToDirMap } from '@/utils/getFIleAndData'
import { getAllNotesData, getCategory, getNoteData } from "@/utils/dataUtil";
export async function POST(req: Request) {
    const { category, fileName } = await req.json()
    const categoryName = categoryToDirMap.get(category)!
    const noteData = getNoteData(categoryName, fileName)
    return NextResponse.json({ data: { noteData } }, { status: 200 })
}