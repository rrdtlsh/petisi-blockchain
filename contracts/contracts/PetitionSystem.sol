// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PetitionSystem {

    struct Petition {
        uint256 id;
        string title;
        string recipient;
        string background;
        string demands;
        address creator;
        uint256 signatureCount;
        uint256 createdAt;
        uint256 updatedAt;
        bool isActive;
    }

    uint256 private _petitionCounter;
    mapping(uint256 => Petition) public petitions;
    mapping(uint256 => mapping(address => bool)) private _hasSigned;
    mapping(uint256 => address[]) private _signers;
    mapping(bytes32 => bool) private _titleExists;

    event PetitionCreated(uint256 indexed id, address indexed creator, string title, uint256 timestamp);
    event PetitionSigned(uint256 indexed id, address indexed signer, uint256 newCount, uint256 timestamp);
    event PetitionClosed(uint256 indexed id, address indexed creator, uint256 timestamp);
    event PetitionEdited(uint256 indexed id, address indexed creator, uint256 timestamp);

    function createPetition(
        string calldata _title,
        string calldata _recipient,
        string calldata _background,
        string calldata _demands
    ) external returns (uint256) {
        require(bytes(_title).length >= 15, "Judul minimal 15 karakter");
        require(bytes(_title).length <= 200, "Judul max 200 karakter");
        require(bytes(_recipient).length > 0, "Penerima tidak boleh kosong");
        require(bytes(_background).length > 0, "Latar belakang tidak boleh kosong");
        require(bytes(_demands).length > 0, "Tuntutan tidak boleh kosong");
        bytes32 titleHash = keccak256(abi.encodePacked(_title));
        require(!_titleExists[titleHash], "Judul petisi sudah digunakan");

        _petitionCounter++;
        uint256 newId = _petitionCounter;
        petitions[newId] = Petition({
            id: newId,
            title: _title,
            recipient: _recipient,
            background: _background,
            demands: _demands,
            creator: msg.sender,
            signatureCount: 0,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isActive: true
        });
        _titleExists[titleHash] = true;
        emit PetitionCreated(newId, msg.sender, _title, block.timestamp);
        return newId;
    }

    function signPetition(uint256 _id) external {
        Petition storage p = petitions[_id];
        require(p.id != 0, "Petisi tidak ditemukan");
        require(p.isActive, "Petisi sudah ditutup");
        require(!_hasSigned[_id][msg.sender], "Anda sudah menandatangani petisi ini");
        _hasSigned[_id][msg.sender] = true;
        _signers[_id].push(msg.sender);
        p.signatureCount++;
        emit PetitionSigned(_id, msg.sender, p.signatureCount, block.timestamp);
    }

    function editPetition(
        uint256 _id,
        string calldata _recipient,
        string calldata _background,
        string calldata _demands
    ) external {
        Petition storage p = petitions[_id];
        require(p.id != 0, "Petisi tidak ditemukan");
        require(p.creator == msg.sender, "Hanya pembuat petisi yang bisa edit");
        require(p.isActive, "Petisi sudah ditutup");
        require(p.signatureCount == 0, "Tidak bisa edit petisi yang sudah ditandatangani");
        require(bytes(_recipient).length > 0, "Penerima tidak boleh kosong");
        require(bytes(_background).length > 0, "Latar belakang tidak boleh kosong");
        require(bytes(_demands).length > 0, "Tuntutan tidak boleh kosong");
        p.recipient = _recipient;
        p.background = _background;
        p.demands = _demands;
        p.updatedAt = block.timestamp;
        emit PetitionEdited(_id, msg.sender, block.timestamp);
    }

    function closePetition(uint256 _id) external {
        Petition storage p = petitions[_id];
        require(p.id != 0, "Petisi tidak ditemukan");
        require(p.creator == msg.sender, "Hanya pembuat petisi yang bisa menutup");
        require(p.isActive, "Petisi sudah ditutup");
        p.isActive = false;
        emit PetitionClosed(_id, msg.sender, block.timestamp);
    }

    function getPetition(uint256 _id) external view returns (Petition memory) {
        Petition storage p = petitions[_id];
        require(p.id != 0, "Petisi tidak ditemukan");
        return p;
    }

    function getTotalPetitions() external view returns (uint256) {
        return _petitionCounter;
    }

    function hasSignedPetition(uint256 _id, address _wallet) external view returns (bool) {
        return _hasSigned[_id][_wallet];
    }

    function getSigners(uint256 _id) external view returns (address[] memory) {
        return _signers[_id];
    }
}