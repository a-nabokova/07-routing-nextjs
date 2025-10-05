import css from './Header.module.css'
import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu'
import { NoteTag } from '@/types/note';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Header() {
    return (
        <header className={css.header}>
  <Link href="/" aria-label="Home">
    NoteHub
  </Link>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
      <TagsMenu tags={tags} />
      </li>
    </ul>
  </nav>
</header>
    )
}