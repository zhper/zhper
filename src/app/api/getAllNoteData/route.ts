import { NextResponse } from "next/server";
import { categoryToDirMap } from '@/utils/getFIleAndData'
import { getAllNotesData, getCategory } from "@/utils/dataUtil";
export async function POST(req: Request) {
    const { category } = await req.json()
    console.log('caca', category)
    const categoryName = categoryToDirMap.get(category)!
    const allNotesData = getAllNotesData(categoryName)
    return NextResponse.json({ data: { allNotesData } }, { status: 200 })
}