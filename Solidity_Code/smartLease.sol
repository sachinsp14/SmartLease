pragma solidity ^0.4.18;

contract smartLease {
    
    struct leaseDetails1 {
    	bytes16 ownerName;
  		bytes16 ownerEthAddr;
  		bytes16 tenantName;
  		bytes16 tenantEthAddr;
    }
    
    struct Instructor2 { 
  		bytes16 startDate;
  		bytes16 rent;
  		bytes16 deposit;
  		bytes16 clause;
  	}
  
    address add1 = msg.sender;
    mapping (address => leaseDetails1) LeaseDetails1;
    mapping (address => leaseDetails2) LeaseDetails2;
    address[] public leaseAccounts;
    
   	function setDetails1(bytes16 _ownerName, bytes16 _ownerEthAddr, bytes16 _tenantName, bytes16 _tenantEthAddr) public {
       	var leaseDetails = LeaseDetails1[add1];       
       	leaseDetails.ownerName = _ownerName;
       	leaseDetails.ownerEthAddr = _ownerEthAddr;
       	leaseDetails.tenantName = _tenantName;
       	leaseDetails.tenantEthAddr = _tenantEthAddr;        
        leaseAccounts.push(add1) -1;
   }
   
    function setDetails2(bytes16 _startDate, bytes16 _rent, bytes16 _deposit, bytes16 _clause) public {
       	var leaseDetails = LeaseDetails2[add1];
       	leaseDetails.startDate = _startDate;
       	leaseDetails.rent = _rent;
       	leaseDetails.deposit = _deposit;
       	leaseDetails.clause = _clause;
        leaseAccounts.push(add1) -1;
   }
   
    function getLeaseDetails1(address _address) view public returns (bytes16, bytes16, bytes16, bytes16) {
        return (LeaseDetails1[_address].ownerName, LeaseDetails1[_address].ownerEthAddr, LeaseDetails1[_address].tenantName, LeaseDetails1[_address].tenantEthAddr);
    }
        
    function getLeaseDetails2(address _address) view public returns (bytes16, bytes16, bytes16, bytes16) {
        return (LeaseDetails2[_address].startDate, LeaseDetails2[_address].rent, LeaseDetails2[_address].deposit, LeaseDetails2[_address].clause);
    }
}