import { useState, useEffect } from 'react';

const attributes = ['Brave', 'Smart', 'Funny', 'Strong'];

const CrewmateForm = ({ initialData = {}, onSubmit }) => {
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');

  useEffect(() => {
    if (initialData.name) setName(initialData.name);
    if (initialData.attribute) setAttribute(initialData.attribute);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !attribute) {
      alert("Please enter a name and select an attribute.");
      return;
    }
    onSubmit({ name, attribute });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <input
        className="w-full p-2 border rounded"
        placeholder="Crewmate name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-2 flex-wrap">
        {attributes.map((attr) => (
          <button
            key={attr}
            type="button"
            className={`px-4 py-2 border rounded ${attribute === attr ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setAttribute(attr)}
          >
            {attr}
          </button>
        ))}
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default CrewmateForm;
