import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";

actor class NFT(itemName : Text, itemOwner : Principal, itemContent : [Nat8]) {

    let name = itemName;
    let owner = itemOwner;
    let content = itemContent;

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
};
