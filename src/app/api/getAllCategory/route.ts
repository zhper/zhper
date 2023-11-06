import { NextResponse } from "next/server";
import { categoryToDirMap } from '@/utils/getFIleAndData'
import { getAllNotesData, getCategory } from "@/utils/dataUtil";
export async function GET(req: Request) {
    const allCategory = getCategory()
    return NextResponse.json({ data: allCategory }, { status: 200 })
}