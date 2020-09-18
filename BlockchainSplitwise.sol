pragma solidity ^0.5.1;

contract BlockchainSplitwise {

    struct Participant {
        //string name;
        address waddress;
        int balance;
        uint index;
        uint last_time;
        address[] creditors;
        ///address[] debtors;
        ///mapping(uint => address) credits;
        mapping(address => uint) debts;
        //mapping(address => bool) agreed;
    }

    struct IOU {
        uint amount;
        uint creationDate;
        uint index;
        address creditor; 
        address debtor; 
    }

    uint public iou_number = 0;

    /// This declares a state variable that stores a `Participant` struct for each possible address.
    mapping(address => Participant) public participants;
    
    /// This store in an array all the participants
    address[] public addressList;

    /// Allow the creation of the first participant when the contract is deployed
    bool public deployed = false;
    
    // A dynamically-sized array of `IOUs` structs.
    ///IOU[] public ious;
    mapping(uint => IOU) IOUs;

    /// This modifier requires that the sender of the transaction is registred as participant
    modifier onlyByParticipant () {
        require(msg.sender == participants[msg.sender].waddress || !deployed);
        _;
    }

    constructor() public {
        createParticipant(msg.sender);
        deployed = true;
    }
    
    function is_already_participant(address user) public view returns (bool ip){
        ip = false;
        for(uint i = 0; i < addressList.length; i++){
            if (user == addressList[i]) ip = true;
        }
    }
    
    function createParticipant(address _waddress) public  onlyByParticipant() returns(address this){
        //require(_waddress != participants[_waddress].waddress || !deployed); //only one address per participant
        //require(_waddress != address(0)); // avoid to participant address equal to 0x0
        address[] memory _creditors;
        Participant memory participant = Participant({waddress: _waddress, balance: 0, index: 0, last_time : 0, creditors : _creditors});
        participant.index = addressList.push(_waddress)-1; //add the address to the addressList
        participants[_waddress] = participant;
        this = _waddress;
    }

    function create_IOU(address _creditor, address _debtor, uint _amount) public onlyByParticipant() {
        IOU memory iou = IOU({amount: _amount, creationDate: now, index: iou_number, creditor: _creditor, debtor: _debtor});
        iou_number++;
        IOUs[iou_number] = iou;
        participants[_debtor].creditors.push(_creditor);
        participants[_debtor].debts[_creditor] = _amount;
    }

    function change_IOU(uint index, uint amount) public{
        IOUs[index].amount -= amount;
        participants[IOUs[index].debtor].debts[IOUs[index].creditor] -= amount;
    }

    function add_IOU(address creditor, uint amount) public onlyByParticipant() {
        uint new_flag = 1;
        for(uint i = 0; i <= iou_number; i++){
            if(IOUs[i].debtor == msg.sender && IOUs[i].creditor == creditor){
                IOUs[i].amount += amount;
                participants[msg.sender].debts[creditor] += amount;
                new_flag = 0;
            }
        }
        if (new_flag == 1){
            create_IOU(creditor, msg.sender, amount);
        }
        participants[creditor].last_time = now;
        participants[msg.sender].last_time = now;
    }

    function lookup(address _debtor, address _creditor) public view returns (uint ret){
        ret = participants[_debtor].debts[_creditor];
    }

    function get_iou_number() public view returns (uint en){
        en = iou_number;
    }
    address[] users_help;
    function get_ith_iou_users(uint i) public returns (address[] memory users){
        users_help.push(IOUs[i].creditor);
        users_help.push(IOUs[i].debtor);
        users = users_help;
    }

    function get_all_creditors(address user) public view returns (address[] memory creditors){
        creditors = participants[user].creditors;
    }

    function get_total_Oed(address user) public view returns(uint to){
        to = 0;
        for(uint i = 0; i < participants[user].creditors.length; i++){
            to = to + participants[user].debts[participants[user].creditors[i]];
        }
    }

    function get_last_time(address user) public view returns (uint time){
        time = participants[user].last_time;
    }

    function get_sender_address() public view returns (address sa){
        sa = msg.sender;
    }
    
    function get_creditor_amount(address user, address _creditor) public view returns (uint am){
        am = participants[user].debts[_creditor];
    }
    
    function get_iou_index(address _debtor, address _creditor) public view returns(uint ind){
        for(uint i = 0; i < iou_number; i++){
            if (IOUs[i].debtor == _debtor && IOUs[i].creditor == _creditor){
                ind = i;
            }
        }
    }
}
