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
 import { useParams } from 'next/navigation';
const PER_PAGE = 12;


const NotesClient = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

    const params = useParams();
  const tag = Array.isArray(params.slug) ? params.slug[0] : undefined;
  

   const handleSeaarch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setCurrentPage(1); 
  }, 300);


 const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const { data, isLoading, isError} = useQuery({
    queryKey: ['notes', currentPage, searchValue],
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
		   <SearchBox value={searchValue} onChange={handleSeaarch} />
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