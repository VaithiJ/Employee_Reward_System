// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC {
    address public owner;
    mapping(address => bool) public companies;
    mapping(address => bool) public employees;
    mapping(address => string) public employeeNames;
    mapping(address => address[]) public companyEmployees;
    mapping(address => mapping(address => uint256)) public allowances;
    mapping(address => uint256) public balances;
    mapping(address => string) public companyNames;
    struct Employee {
        address employeeAddress;
        string name;
    }

    string public name;
    string public symbol;
    uint8 public decimals;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function.");
        _;
    }

    modifier onlyAdmin() {
        require(companies[msg.sender], "Only registered companies can call this function.");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid recipient address.");
        require(amount > 0, "Amount must be greater than 0.");
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function sendToCompany(uint256 amount, address companyaddress) public onlyOwner  {
        require(amount > 0, "Amount must be greater than 0.");
        require(companies[companyaddress], "Address must be registered as a company.");
        balances[companyaddress] += amount;
        emit Transfer(msg.sender, companyaddress, amount);
    }

    function regCompany(address companyaddress, string memory companyname) public onlyOwner {
        require(companyaddress != address(0), "Invalid company address.");
        require(!companies[companyaddress], "Company is already registered.");

        companies[companyaddress] = true;
        companyNames[companyaddress] = companyname;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function regEmployee(address employeeaddress, string memory employeename) public onlyAdmin {
        require(employeeaddress != address(0), "Invalid employee address.");
        require(!employees[employeeaddress], "Employee is already registered.");

        employees[employeeaddress] = true;
        employeeNames[employeeaddress] = employeename;

        // Add the employee to the list of employees for the company that called this function
        companyEmployees[msg.sender].push(employeeaddress);
    }

    function sendReward(address employeeaddress, uint256 amount) public onlyAdmin {
        require(employees[employeeaddress], "Address must be registered as an employee.");
        require(amount > 0, "Amount must be greater than 0.");
        require(balances[msg.sender] >= amount, "Not enough balance.");
        balances[msg.sender] -= amount;
        balances[employeeaddress] += amount;
        emit Transfer(msg.sender, employeeaddress, amount);
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

function getEmployeeCount(address companyaddress) public view returns (uint256) {
    return companyEmployees[companyaddress].length;
}

function getCompanyEmployees(address companyaddress) public view returns (Employee[] memory) {
    Employee[] memory result = new Employee[](companyEmployees[companyaddress].length);
    for (uint i = 0; i < companyEmployees[companyaddress].length; i++) {
        result[i] = Employee(companyEmployees[companyaddress][i], employeeNames[companyEmployees[companyaddress][i]]);
    }
    return result;
}
function isCompanyRegistered(address companyaddress) public view returns (bool) {
    return companies[companyaddress];
}

function isEmployeeRegistered(address employeeaddress) public view returns (bool) {
    return employees[employeeaddress];
}
}


