// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PetitionSystem
 * @dev Sistem tanda tangan petisi berbasis blockchain
 * Setiap wallet hanya bisa menandatangani petisi 1 kali
 */
contract PetitionSystem {

    // ─────────────────────────────────────────
    // STRUCT: menyimpan data tiap petisi
    // ─────────────────────────────────────────
    struct Petition {
        uint256 id;
        string title;
        string description;
        address creator;
        uint256 signatureCount;
        uint256 createdAt;
        bool isActive;
    }

    // ─────────────────────────────────────────
    // STATE VARIABLES
    // ─────────────────────────────────────────
    uint256 private _petitionCounter;   // auto-increment ID

    // petitionId => Petition
    mapping(uint256 => Petition) public petitions;

    // petitionId => walletAddress => sudah tanda tangan?
    mapping(uint256 => mapping(address => bool)) private _hasSigned;

    // list semua ID petisi (untuk iterasi di frontend)
    uint256[] private _petitionIds;

    // ─────────────────────────────────────────
    // EVENTS: dicatat di blockchain log
    // ─────────────────────────────────────────
    event PetitionCreated(
        uint256 indexed petitionId,
        address indexed creator,
        string title,
        uint256 timestamp
    );

    event PetitionSigned(
        uint256 indexed petitionId,
        address indexed signer,
        uint256 newCount,
        uint256 timestamp
    );

    event PetitionClosed(
        uint256 indexed petitionId,
        address indexed creator,
        uint256 timestamp
    );

    // ─────────────────────────────────────────
    // WRITE FUNCTION 1: Buat petisi baru
    // ─────────────────────────────────────────
    function createPetition(
        string calldata _title,
        string calldata _description
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Judul petisi tidak boleh kosong");
        require(bytes(_title).length <= 200, "Judul terlalu panjang (max 200 karakter)");
        require(bytes(_description).length > 0, "Deskripsi tidak boleh kosong");
        require(bytes(_description).length <= 1000, "Deskripsi terlalu panjang (max 1000 karakter)");

        _petitionCounter++;
        uint256 newId = _petitionCounter;

        petitions[newId] = Petition({
            id: newId,
            title: _title,
            description: _description,
            creator: msg.sender,
            signatureCount: 0,
            createdAt: block.timestamp,
            isActive: true
        });

        _petitionIds.push(newId);

        emit PetitionCreated(newId, msg.sender, _title, block.timestamp);

        return newId;
    }

    // ─────────────────────────────────────────
    // WRITE FUNCTION 2: Tanda tangani petisi
    // ─────────────────────────────────────────
    function signPetition(uint256 _petitionId) external {
        Petition storage petition = petitions[_petitionId];

        require(petition.id != 0, "Petisi tidak ditemukan");
        require(petition.isActive, "Petisi sudah ditutup");
        require(!_hasSigned[_petitionId][msg.sender], "Anda sudah menandatangani petisi ini");

        _hasSigned[_petitionId][msg.sender] = true;
        petition.signatureCount++;

        emit PetitionSigned(_petitionId, msg.sender, petition.signatureCount, block.timestamp);
    }

    // ─────────────────────────────────────────
    // WRITE FUNCTION 3: Tutup petisi (hanya creator)
    // ─────────────────────────────────────────
    function closePetition(uint256 _petitionId) external {
        Petition storage petition = petitions[_petitionId];

        require(petition.id != 0, "Petisi tidak ditemukan");
        require(petition.creator == msg.sender, "Hanya pembuat petisi yang bisa menutup");
        require(petition.isActive, "Petisi sudah ditutup");

        petition.isActive = false;

        emit PetitionClosed(_petitionId, msg.sender, block.timestamp);
    }

    // ─────────────────────────────────────────
    // READ FUNCTION 1: Ambil data satu petisi
    // ─────────────────────────────────────────
    function getPetition(uint256 _petitionId) external view returns (Petition memory) {
        require(petitions[_petitionId].id != 0, "Petisi tidak ditemukan");
        return petitions[_petitionId];
    }

    // ─────────────────────────────────────────
    // READ FUNCTION 2: Ambil semua ID petisi
    // ─────────────────────────────────────────
    function getAllPetitionIds() external view returns (uint256[] memory) {
        return _petitionIds;
    }

    // ─────────────────────────────────────────
    // READ FUNCTION 3: Cek apakah wallet sudah tanda tangan
    // ─────────────────────────────────────────
    function hasSignedPetition(uint256 _petitionId, address _wallet) external view returns (bool) {
        return _hasSigned[_petitionId][_wallet];
    }

    // ─────────────────────────────────────────
    // READ FUNCTION 4: Total petisi yang dibuat
    // ─────────────────────────────────────────
    function getTotalPetitions() external view returns (uint256) {
        return _petitionCounter;
    }
}
