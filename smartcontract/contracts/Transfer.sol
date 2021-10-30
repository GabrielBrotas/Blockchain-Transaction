// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol"; // permission check
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; // Price consumer

contract Transfer is Ownable {
    address[] public allowedTokens;
    mapping(address => address) public tokenPriceFeedMapping;

    function transferEther(address _token, address _to) public payable {
        require(tokenIsAllowed(_token), "Invalid token");

        require(
            msg.sender != _to,
            "you cant execute a transaction to yourself"
        );

        // $20 dolar in wei
        uint256 minimunUSD = 20 * 10**18; // convert to wei
        require(
            getConvertionRate(msg.value, _token) >= minimunUSD,
            "You need to spend more ETH!"
        );

        payable(_to).transfer(msg.value);
    }

    function getConvertionRate(uint256 ethAmount, address _token)
        public
        view
        returns (uint256)
    {
        (uint256 ethPrice, uint256 decimals) = getValueUsdEth(_token);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / (1 * 10**decimals);
        return ethAmountInUsd;
    }

    function getValueUsdEth(address _token) public view returns (uint256, uint256) {
        // price feed address
        address priceFeedAddress = tokenPriceFeedMapping[_token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);

        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = uint256(priceFeed.decimals());

        return (uint256(price), decimals);
    }

    function addAllowedToken(address _token, address _priceFeed) public onlyOwner {
        allowedTokens.push(_token);
        tokenPriceFeedMapping[_token] = _priceFeed;
    }

    function tokenIsAllowed(address _token) public view returns (bool) {
        for (uint256 i = 0; i < allowedTokens.length; i++) {
            if (allowedTokens[i] == _token) {
                return true;
            }
        }
        return false;
    }
}
