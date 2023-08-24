// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
contract Lottery is Ownable {

    /// @notice Flag indicating whether the lottery is open for bets or not
    bool public betsOpen;

    /// @notice Timestamp of the lottery next closing date and time
    uint256 public betsClosingTime;

    /// @notice Passes when the lottery is at closed state

    modifier whenBetsClosed() {
        require(!betsOpen, "Lottery is open");
        _;
    }

    /// @notice Passes when the lottery is at open state and the current block timestamp is lower than the lottery closing date
    modifier whenBetsOpen() {
        require(
            betsOpen && block.timestamp < betsClosingTime,
            "Lottery is closed");
        _;

    }

    function openBets(uint256 closingTime) external whenBetsClosed onlyOwner {
        require(
            closingTime > block.timestamp,
            "Closing time must be in the future"
        );

        betsClosingTime = closingTime;
        betsOpen = true;

    }

 

    // TODO

}