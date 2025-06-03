import React, {useState, useEffect} from 'react';
import {doc, deleteDoc, updateDoc, Timestamp} from 'firebase/firestore';
import {db} from "../../firebaseconfig";
import {Trash2, Pencil} from 'lucide-react';


function NoteCard({note}) {
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

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
            console.error('Error deleting note', error);
            setDeleting(false);
            setConfirmDelete(false)
        }
    };

    const handleUpdate = async () => {
        try {
            const noteRef = doc(db, 'notes', note.id);
            await updateDoc(noteRef, {
                title,
                content,
                updatedAt: Timestamp.now(),
            });
            setEditing(false);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };
    
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className='p-4'>
                <div className="flex justify-between items-start mb-2">
                    {editing ? (
                        <input className="w-full text-lg font-medium border rounded p-1 mb-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{note.title}</h3>)}
                    <div className="flex gap-2 ml-2">
                        <button onClick={() => setEditing(!editing)} className="text-gray-400 hover:text-blue-500 transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                        </button>
                        
                    <button className={`text-sm flex items-center justify-center p-1 rounded-full transition-colors ${
                        confirmDelete ? 'bg-red-400 text-red-600' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`} disabled={deleting} onClick={handleDelete} title="Delete">
                    
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </div>

                {editing ? (
                    <>
                    <textarea
                       className="w-full border rounded p-1"
                       rows={3}
                       value={content}
                       onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="mt-2 flex gap-2">
                        <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Save</button>
                    <button onClick={() => {
                        setEditing(false);
                        setTitle(note.title);
                        setContent(note,content);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div>
                    {note.content || <span className="italic text-gray-400"> No content </span>}
                </div>
            )}

                <div className="mt-2 text-sm text-gray-500">
                    {formDate(note.createdAt)}
                </div>
            </div>
            
        </div>
    );
}

export default NoteCard;