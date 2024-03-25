import { NextResponse } from "next/server";
import { categoryToDirMap } from '@/utils/getFIleAndData'
import { getAllNotesData, getCategory, getCategoryAllNotes } from "@/utils/dataUtil";
export async function POST(req: Request) {
    const { category } = await req.json()
    const categoryName = category!
    const allNotesData = getCategoryAllNotes(categoryName)
    return NextResponse.json({ data: allNotesData }, { status: 200 })
}