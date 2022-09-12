// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  struct Course {
    uint id; // default to uint256 - 32 bytes (slot 1)
    uint price; // 32 bytes (slot 2)

    /**
     * 8 * 32 = 256 bits hexadecimal characters, keccak encoded that is unique to the user, purchaser of the course
     */
    bytes32 proof; // 32 bytes (slot 3)
    
    // user who has purchased the course
    address owner; // 20 bytes (slot 4)

    State state; // 1 byte (slot 4)
  }
}
