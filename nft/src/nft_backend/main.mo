import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor Main {

    // Hashmaps for storing all nfts and owners
    var nfts = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var owners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

    public shared (msg) func mint(content : [Nat8], name : Text) : async Principal {
        // Get the Principal of the owner of the NFT
        let owner : Principal = msg.caller;
        // Add Cycles to create new NFT
        Cycles.add(100_500_000_000);
        // Create new NFT
        let nft = await NFTActorClass.NFT(name, owner, content);
        // Get and Return the canister ID
        let nftPrincipal = await nft.getCanisterId();
        // Add NFT to hasmap of nfts
        nfts.put(nftPrincipal, nft);
        // Add to the hasmap of owners
        addToOwners(owner, nftPrincipal);
        // Print balance
        Debug.print(debug_show (Cycles.balance()));
        // Return the principal of nft
        return nftPrincipal;
    };

    // Add new NFT to owner's list
    private func addToOwners(owner : Principal, nftId : Principal) {
        // Get the owners list, or initialize a new empty list
        var ownerNfts : List.List<Principal> = switch (owners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result;
        };
        // Append the new NFT to list
        ownerNfts := List.push(nftId, ownerNfts);
        // Store the new list with the owner to hasmap
        owners.put(owner, ownerNfts);
    };

    // Get the NFTs of a user
    public query func getOwnerNfts(user : Principal) : async [Principal] {
        // Get the NFTs from the owners list
        let userNfts : List.List<Principal> = switch (owners.get(user)) {
            case null List.nil<Principal>();
            case (?result) result;
        };
        // Convert to array format and return
        return List.toArray(userNfts);
    };

};
