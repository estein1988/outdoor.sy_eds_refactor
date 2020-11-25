export default function Search(props) {
    return (
        <form className="search" >
            <label>Search by Customer
                <input onChange={props.updateSearchTerm}type='text' name='search-term' value={props.searchTerm} />
            </label>
        </form>
    )
}