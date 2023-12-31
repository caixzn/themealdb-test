import { Link } from "react-router-dom";

export function SearchBar({ text, onTextChange, placeholder }: { text: string; onTextChange: (text: string) => void; placeholder?: string; }) {
    return (
      <div className="flex gap-2">
        <input
          className="flex-grow max-w-lg p-2 my-2 rounded-sm bg-zinc-950 text-stone-200"
          type="text"
          value={text}
          placeholder={placeholder}
          onChange={(e) => onTextChange(e.target.value)} />
  
        {text !== undefined ?
          (<Link
            className="relative self-center w-24 p-2 transition ease-in-out rounded-sm bg-zinc-950 hover:bg-zinc-300 hover:text-stone-800"
            to={text.replace(/ /g, '_')}
          >
            buscar
          </Link>) : null
        }
  
      </div>
    );
  }
  