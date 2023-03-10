import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor Main {

    Debug.print("");

    // Datatype for a listing
    private type Listing = {
        itemOwner : Principal;
        itemPrice : Nat;
    };

    // Hashmaps for storing all nfts, owners, and listings
    var nfts = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    var owners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    var listings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

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

    // return all listed NFTs
    public query func getListedNFTs() : async [Principal] {
        // Create array of listings hashmap
        let ids = Iter.toArray(listings.keys());
        return ids;
    };

    // Add a listing
    public shared (msg) func listItem(id : Principal, price : Nat) : async Text {
        // Get the NFT from the HashMap
        let item : NFTActorClass.NFT = switch (nfts.get(id)) {
            case null return "NFT Does not exist.";
            case (?result) result;
        };
        // Get the owner of item
        let owner = await item.getOwner();
        // Check if owner principal is equal
        if (Principal.equal(owner, msg.caller)) {
            // Create a new listing
            let newListing : Listing = {
                itemOwner = owner;
                itemPrice = price;
            };
            // Save the new listing in the listings hashmap
            listings.put(id, newListing);
            return "Success!";
        };
        return "You don't own the NFT.";
    };

    // Return the prinicpal id of this canister
    public query func getNftBackendCanisterId() : async Principal {
        return Principal.fromActor(Main);
    };

    // Check if an NFT is listed
    public query func isListed(id : Principal) : async Bool {
        if (listings.get(id) == null) {
            return false;
        } else {
            return true;
        };
    };

    // Return the original owner of NFT
    public query func getOriginalOwner(id : Principal) : async Principal {
        // Search for listing with id
        let listing : Listing = switch (listings.get(id)) {
            case null return Principal.fromText("");
            case (?result) result;
        };
        // Return owner of the found listing
        return listing.itemOwner;
    };

    // Get the price of a listing
    public query func getListedNftPrice(id : Principal) : async Nat {
        // Look for listing with specific id
        let listing : Listing = switch (listings.get(id)) {
            case null return 0;
            case (?result) result;
        };
        // return the price of listing
        return listing.itemPrice;

    };
};
