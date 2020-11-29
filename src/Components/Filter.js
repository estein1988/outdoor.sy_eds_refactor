export default function Filter(props) {
    return (
        <form className="filter" >
            <h3>Filter By Vehicle Type</h3>
            <label htmlFor="filterBy"> Filter: </label>
            <select id="filterBy" onChange={props.updateCurrentFilter} value={props.currentFilter}>
                <option value="all">Show all</option>
                <option value="RV">Show Only RVs</option>
                <option value="sailboat">Show Only Sailboats</option>
                <option value="campervan">Show Only Campervans</option>
                <option value="bicycle">Show Only Bicycles</option>
                <option value="motorboat">Show Only Motorboats</option>
            </select>
        </form>
    )
}