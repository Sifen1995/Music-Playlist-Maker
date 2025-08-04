import React from 'react';
import { Link } from 'react-router-dom';

interface PlaylistCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ id, name, description, imageUrl }) => {
  return (
    <Link to={`/playlist/${id}`} className="block relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        {description && (
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default PlaylistCard;