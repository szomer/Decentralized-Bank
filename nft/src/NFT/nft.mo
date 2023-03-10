import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";

actor class NFT(itemName : Text, itemOwner : Principal, itemContent : [Nat8]) = this {
    private let name = itemName;
    private var owner = itemOwner;
    private let content = itemContent;

    // Getters
    public query func getName() : async Text {
        return name;
    };
    public query func getOwner() : async Principal {
        return owner;
    };
    public query func getContent() : async [Nat8] {
        return content;
    };
    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    // Change owner of NFT
    public shared (msg) func transferOwnership(newOwner : Principal) : async Text {
        // Check if user owns the nft
        if (msg.caller != owner) return "Error: Not initiated by NFT Owner.";
        // Change owner of the NFT
        owner := newOwner;
        return "Success!";
    };
};
