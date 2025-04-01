

import { useState, useEffect, createContext } from "react";
import GetAuctions from "../services/SearchService";

export const SearchContext = createContext();

const SearchProvider = (props) => {
    const [auctions, setAuctions] = useState([]);

    // const searchAuction = (keyword) => {
    //     GetAuctions(keyword)
    //         .then(result => {
    //             setAuctions(result);
    //         });
    // };
    const searchAuction = (keyword) => {
        console.log("Keyword to search:", keyword);  // Log keyword to check input
        GetAuctions(keyword)
            .then(result => {
                console.log("Auctions fetched:", result);  // Log the fetched results
                setAuctions(result);
            })
            .catch(error => {
                console.error("Error during auction search:", error);
            });
    };

    const clearSearch = () => {
        setAuctions([]); // Reset search results
    };

    useEffect(() => {
        console.log("Auctions state:", auctions); // Log auctions to ensure it's updated
    }, [auctions]);

    return (
        <SearchContext.Provider value={{ auctions, searchAuction, clearSearch }}>
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
