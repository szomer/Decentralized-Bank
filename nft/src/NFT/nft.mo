import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";

actor class NFT(itemName : Text, itemOwner : Principal, itemContent : [Nat8]) = this {

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
    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };
};
