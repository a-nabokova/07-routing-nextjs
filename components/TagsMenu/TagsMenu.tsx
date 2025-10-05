
'use client';

import css from './TagsMenu.module.css';
import { NoteTag } from '@/types/note';
 
import { useState } from 'react';
import Link from 'next/link';

type TagsMenuProps = {
  tags: NoteTag[];
};



const TagsMenu = ({ tags }: TagsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
        <li className={css.menuItem}>
            <Link href={`/notes/filter/All`} onClick={toggle}>
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} onClick={toggle}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;