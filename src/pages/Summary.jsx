import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
  const [crewmates, setCrewmates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setCrewmates(data);
    };

    fetchCrewmates();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Crew</h2>
      {crewmates.length === 0 ? (
        <p>No crewmates yet. Go create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {crewmates.map((crewmate) => (
            <div
              key={crewmate.id}
              onClick={() => navigate(`/crewmate/${crewmate.id}`)}
              className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="text-xl font-semibold">{crewmate.name}</h3>
              <p className="text-gray-600">{crewmate.attribute}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
