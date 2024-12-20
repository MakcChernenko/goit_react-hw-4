// цей компонент повертає форму і пропс як колбек функцію onSearch(value)
const Header = ({ onSearch }) => {
  const handleForm = e => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.images.value;
    onSearch(value);
    form.reset();
  };
  return (
    <header>
      <form onSubmit={handleForm}>
        <input
          name="images"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Пошук англійською"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default Header;
