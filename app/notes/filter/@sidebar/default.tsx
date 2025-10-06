import css from './SidebarNotes.module.css';
import { NoteTag } from '@/types/note';
import Link from 'next/link';

 

const SidebarNotes = ( ) => {

  const tags: (NoteTag | 'All')[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  
    return (
        
          <ul className={css.menuList}>
    {/* список тегів */}
       {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
    </ul>
    )
}


 


export default SidebarNotes; 