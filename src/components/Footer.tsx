import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 sm:mt-14 md:mt-16 py-4 sm:py-5 md:py-6 text-center text-purple-700">
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 mr-2" />
        <p className="text-xs sm:text-sm md:text-base">
          Feito com amor, para você abrir quando precisar.
        </p>
        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 ml-2" />
      </div>
      <p className="text-xs text-purple-500 mt-2">
        © {new Date().getFullYear()} Abra Quando... Todas as mensagens são escritas com carinho.
      </p>
    </footer>
  );
};

export default Footer;