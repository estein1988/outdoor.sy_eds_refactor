export default function Filter(props) {
    return (
        <form className="filter" >
            <select onChange={props.updateCurrentFilter} value={props.currentFilter}>
                <option value="all">Show all</option>
                <option value="RV">Show Only RVs</option>
                <option value="Sailboat">Show Only Sailboats</option>
                <option value="Van">Show Only Vans</option>
                <option value="bike">Show Only Bikes</option>
            </select>
        </form>
    )
}