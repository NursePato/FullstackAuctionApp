import React from "react";

const BidMessage = ({ message }) => {
    if (!message) return null;

    return <p>{message}</p>;
};

export default BidMessage;
