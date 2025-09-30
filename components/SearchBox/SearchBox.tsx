import css from './SearchBox.module.css';
// import {  type DebouncedState } from 'use-debounce';



interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
    return (
        <>
            <input
  className={css.input}
  type="text"
  placeholder="Search notes" defaultValue={value} onChange={handleChange}
 />
        </>
    )
}