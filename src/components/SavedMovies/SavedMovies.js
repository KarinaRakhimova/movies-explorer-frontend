import SearchAndFilterSaved from "../SearchAndFilterSaved/SearchAndFilterSaved";
export default function SavedMovies({
  savedMovies,
  deleteMovie,
  setIsLoading,
  setReqStatus,
  setMessage,
  setIsOpen,
}) {
  return (
    <SearchAndFilterSaved
      savedMovies={savedMovies}
      deleteMovie={deleteMovie}
      setIsLoading={setIsLoading}
      setReqStatus={setReqStatus}
      setMessage={setMessage}
      setIsOpen={setIsOpen}
    />
  );
}
