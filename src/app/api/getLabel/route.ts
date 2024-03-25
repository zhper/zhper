import { NextResponse } from "next/server";
import { categoryToDirMap } from '@/utils/getFIleAndData'
import { getAllNotesData, getCategory, categorify } from "@/utils/dataUtil";
export async function POST(req: Request) {
    const categorySet = categorify()
    return NextResponse.json({ data: categorySet }, { status: 200 })
}