'use client';


import css from './page.module.css'
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm';
import fetchNotes from '@/lib/api';
 const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string;
}



const NotesClient = ({ tag }: NotesClientProps) => {
    const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

   
   const handleSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setCurrentPage(1); 
  }, 300);


 const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const { data, isLoading, isError} = useQuery({
    queryKey: ['notes', searchValue, currentPage, PER_PAGE, tag],
     queryFn: () => fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: searchValue,
        ...(tag && tag !== 'All' ? { tag } : {}),  
      }),
    placeholderData: keepPreviousData,

  })
   

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

 

  return (
   <div className={css.app}>
      <header className={css.toolbar}>
		   <SearchBox value={searchValue} onChange={handleSearch} />
		  {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={currentPage}   
          onPageChange={(selectedPage) => setCurrentPage(selectedPage)} // 
        />
      )}
		<button className={css.button} onClick={openModal}>Create note +</button>

      </header>
     {isLoading && <p>Loader</p>}
      {isError && <p>Error</p>}

      {!isLoading && !isError && notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm  onClose={closeModal}/>
        </Modal>
      )}
       
</div>
  )
}



export default NotesClient; 