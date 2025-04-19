import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import CrewmateForm from '../components/CrewmateForm';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      setCrewmate(data);
    };

    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    const { error } = await supabase
      .from('crewmates')
      .update(updatedData)
      .eq('id', id);

    if (!error) navigate('/summary');
    else alert('Update failed');
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this crewmate?');
    if (!confirm) return;

    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);

    if (!error) navigate('/summary');
    else alert('Delete failed');
  };

  if (!crewmate) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Crewmate</h2>
      <CrewmateForm initialData={crewmate} onSubmit={handleUpdate} />
      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        Delete Crewmate
      </button>
    </div>
  );
};

export default Edit;
