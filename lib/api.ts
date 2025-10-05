import axios from "axios";
import type { Note, NoteTag } from "../types/note";

 const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    
}

interface FetchNotesOptions {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

 
export default async function fetchNotes({ page, perPage, search, tag }: FetchNotesOptions) {
     const res = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', {
        params: {
            page,
            perPage,
             search,  
            ...(tag ? { tag } : {})
        },
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return res.data; 
}


export interface CreateNotes {
     title: string;
    content: string;
    tag: NoteTag; 
    
}

export  async function createNote(note: CreateNotes) {
    const res = await axios.post<Note>('https://notehub-public.goit.study/api/notes', note, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

        return res.data; 


}


export  async function deleteNote(id: string) {
    const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

        return res.data; 


}
 
 export async function getSingleNote(id: string) {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

        return res.data; 


}
 