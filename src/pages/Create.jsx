import CrewmateForm from '../components/CrewmateForm';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const handleCreate = async ({ name, attribute }) => {
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, attribute }]);
  
    console.log("DATA:", data);
    console.log("ERROR:", error);
  
    if (!error) navigate('/summary');
    else alert('Error creating crewmate');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Crewmate</h2>
      <CrewmateForm onSubmit={handleCreate} />
    </div>
  );
};

export default Create;