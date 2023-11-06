import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { categoryToDirMap } from './getFIleAndData'
import { fileToNoteMap } from './getFIleAndData'

const postsDir = path.join(process.cwd(), 'notes')

// 获得某一个 category 下面的所有的 note 名， 返回一个数组
export function getCategoryAllNotes(category: string) {
    return fs.readdirSync(path.join(postsDir, category))
}

// 获得一个 note 的数据，包括 title date image excerpt slug isFeatrued
export function getNoteData(category: string, fileName: string) {
    const postSlug = fileName.replace(/\.md$/, '')
    const filePath = path.join(postsDir, category, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const noteData = {
        slug: fileToNoteMap.get(postSlug),
        ...data,
        content
    }
    return noteData
}

// 获得一个所有的 categroy
export function getCategory() {
    return fs.readdirSync(postsDir)
}


// 获得某一个 category 下面的所有的 note 的数据, 按时间排序
export function getAllNotesData(category: string) {
    const notesFile = getCategoryAllNotes(category)
    const notesData = notesFile.map(item => getNoteData(category, item))

    const sortedNotes = notesData.sort((a, b) => a.date - b.date)
    return sortedNotes

}