import "./index.css";

const SearchInfo = ({searchText, searchCount}) => {
	return (
		searchText && <div className="search-title"> 
		По вашему запросу <span>{searchText}</span> найдено <span>{searchCount}</span> товаров
		
		</div>
	
	);
};

export default SearchInfo;
