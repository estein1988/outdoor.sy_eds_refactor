export default function Search(props) {
    return (
        <form className="search" >
            <h3>Search By Customer</h3>
            <label>
                <input onChange={props.updateSearchTerm}type='text' name='search-term' value={props.searchTerm} />
            </label>
        </form>
    )
}