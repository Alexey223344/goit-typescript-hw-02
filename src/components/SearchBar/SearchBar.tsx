import toast from "react-hot-toast";
import { FC, FormEvent } from "react";


interface SearchProp {
  onSubmit: (value: string) => void;
}

const SearchBar: FC<SearchProp> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
   

    const inputValue: string = (form.elements.namedItem('searchInput') as HTMLInputElement)?.value;
    if (!inputValue) {
      return toast("Text must be entered to search for images!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    onSubmit(inputValue);
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="serchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;
