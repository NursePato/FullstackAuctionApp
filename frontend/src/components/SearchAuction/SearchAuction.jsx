

import { useContext, useRef, useState, useEffect } from "react";
import { SearchContext } from "../../contexts/SearchProvider";
import AuctionCardList from "../AuctionList/AuctionCardList";
import './SearchAuction.css';

const SearchAuctions = () => {
    const textVal = useRef();
    const { searchAuction, auctions, clearSearch } = useContext(SearchContext);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const keyword = textVal.current.value.trim() === "" ? null : textVal.current.value;
        console.log("Keyword to search:", keyword);
        await searchAuction(keyword);
        setLoading(false);
    };

    // Clear search results when leaving the page
    useEffect(() => {
        return () => {
            clearSearch();
        };
    }, []);

    return (
        <div className="searchAuctionStyle">
            <h4>Search for an auction here by name</h4>
            <input type="text" ref={textVal} />
            <button onClick={handleSearch}>Search</button>

            {loading ? <p>Loading...</p> : <AuctionCardList auctions={auctions} />}
        </div>
    );
};

export default SearchAuctions;
