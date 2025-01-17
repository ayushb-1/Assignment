import React, {useState, useMemo} from 'react';
import { Search } from 'lucide-react';

const hobbies = ['Reading', 'Traveling', 'Cooking', 'Gaming', 'Photography', 'Painting', 'Writing', 'Music', 'Dancing', 'Hiking'];

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHobbies = useMemo(() => {
    return hobbies.filter(hobby => 
      hobby.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <h2 className="text-lg font-semibold text-gray-800">Hobbies</h2>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {filteredHobbies.length}
        </span>
      </div>

      
      <div className="p-4">
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search hobbies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          {filteredHobbies.map((hobby) => (
            <div
              key={hobby}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', hobby)}
              className="group flex cursor-move items-center rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-2 text-gray-400 group-hover:text-gray-600">⋮⋮</span>
              <span className="text-sm font-medium">{hobby}</span>
            </div>
          ))}
          {/* No Results Message */}
          {filteredHobbies.length === 0 && (
            <div className="py-3 text-center text-sm text-gray-500">
              No hobbies found
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;