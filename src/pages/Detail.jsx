import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) setCrewmate(data);
      else alert('Crewmate not found');
    };

    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">{crewmate.name}</h2>
      <p className="text-gray-700 text-lg">Attribute: {crewmate.attribute}</p>
      <button
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={() => navigate(`/edit/${crewmate.id}`)}
      >
        Edit Crewmate
      </button>
    </div>
  );
};

export default Detail;
