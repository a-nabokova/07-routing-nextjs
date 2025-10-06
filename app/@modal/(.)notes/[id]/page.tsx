 import { getSingleNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
 
interface Props {
  params: Promise<{id: string}>;
}

const NotePreviewPage = async ({ params }: Props) => {
    const { id } = await params 
    const note = await getSingleNote(id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
};

export default NotePreviewPage;