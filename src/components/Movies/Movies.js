import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
export default function Movies({
  setIsLoading,
  savedMovies,
  setReqStatus,
  setMessage,
  setIsOpen,
  saveMovie,
  deleteMovie,
}) {
  return (
    <SearchAndFilter
      setIsLoading={setIsLoading}
      savedMovies={savedMovies}
      setReqStatus={setReqStatus}
      setMessage={setMessage}
      setIsOpen={setIsOpen}
      saveMovie={saveMovie}
      deleteMovie={deleteMovie}
    />
  );
}
