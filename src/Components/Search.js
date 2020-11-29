export default function Search(props) {
    return (
        <form className="search"  onSubmit={event => {event.preventDefault(); }}>
            <h3>Search By Customer</h3>
            <label htmlFor="searchInput"> Search: </label>
                <input id="searchInput" onChange={props.updateSearchTerm}type='text' name='search-term' value={props.searchTerm} />
        </form>
    )
}