import { slugTofileMap } from './../../../utils/getFIleAndData';
import { NextResponse } from "next/server";
import { categoryToDirMap } from '@/utils/getFIleAndData'
import { getAllNotesData, getCategory, getNoteData } from "@/utils/dataUtil";
export async function POST(req: Request) {
    const { category, fileName } = await req.json()
    const categoryName = categoryToDirMap.get(category)!
    const file = slugTofileMap.get(fileName)!
    const noteData = getNoteData(categoryName, file)
    return NextResponse.json({ data: { noteData } }, { status: 200 })
}