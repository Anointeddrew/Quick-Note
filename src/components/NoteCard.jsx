import React, {useState} from 'react';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from "../../firebaseconfig";
import {Trash2} from 'lucide-react';


function NoteCard({note}) {
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const formDate = (timestamp) => {
        if (!timestamp) return "Just Now";

        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month:"short",
            day:"numeric",
            year:"numeric",
            hour:"numeric",
            minute:"numeric"
        }).format(date);
    }

    const handleDelete = async () => {
        if(!confirmDelete) {
            setConfirmDelete(true);

            setTimeout(()=> 
                setConfirmDelete(false), 3000
            )
            return;
        }

        try {
            setDeleting(true);

            await deleteDoc(doc(db, 'notes', note.id));
        } catch (error) {
            console.error('Error deleting notes', error);
            setDeleting(false);
            setConfirmDelete(false)
        }
    }
    
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className='p-4'>
                <div className="flex justify-beyween items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{note.title}</h3>
                    <button className={`text-sm flex items-center justify-center p-1 rounded-full transition-colors ${
                        confirmDelete ? 'bg-red-400 text-red-600' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`} disabled={deleting} onClick={handleDelete}>
                        <Trash2 className='h-4 w-4' />
                    </button>
                </div>

                <div >
                    {note.content} || <span> No coment </span>
                </div>

                <div>
                    {formDate(note.createdAt)}
                </div>
            </div>
            
        </div>
    );
}

export default NoteCard;