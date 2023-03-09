import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    // Variables
    private let owner : Principal = Principal.fromText("");
    private let totalSupply : Nat = 500000000;
    private let symbol : Text = "TATO";

    // HashMap cant be stable so we create a temp variable to work around
    // Array with Principle and Natrual number
    private stable var balanceEntries : [(Principal, Nat)] = [];

    // Hashmap to store balance of users
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    // On first initialzation
    if (balances.size() == 0) {
        // Add to the hashmap
        balances.put(owner, totalSupply);
    };

    // Return the balance of a specific user
    public query func getBalanceOf(who : Principal) : async Nat {
        switch (balances.get(who)) {
            case null (return 0);
            case (?result)(return result);
        };
    };

    // Return the currency symbol
    public query func getSymbol() : async Text {
        return symbol;
    };

    // Claim free tokens
    public shared (msg) func payOut() : async Text {
        Debug.print(debug_show (msg.caller));

        if (balances.get(msg.caller) == null) {
            // Add 10,000 free tokens to user
            let result = await transfer(msg.caller, 10000);
            return result;

        } else {
            // The user already claimed the tokens
            return "Already Claimed!";
        };
    };

    // Transfer tokens
    public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
        // Get the balance of the sender
        let fromBalance = await getBalanceOf(msg.caller);

        // The sender does not have enough tokens
        if (fromBalance < amount) return "Insufficient Funds!";

        // Subtract the amount from the sender
        let newFromBalance : Nat = fromBalance -amount;
        balances.put(msg.caller, newFromBalance);

        // Add the amount to the receiver
        let toBalance = await getBalanceOf(to);
        let newToBalance = toBalance + amount;
        balances.put(to, newToBalance);

        return "Success!";
    };

    // System methods
    system func preupgrade() {
        // Store the balances entries into the temp array
        balanceEntries := Iter.toArray(balances.entries());
    };
    system func postupgrade() {
        // Populate the hashmap with the saved entries from the temp array
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);

        // On first initialzation
        if (balances.size() == 0) {
            // Add to the hashmap
            balances.put(owner, totalSupply);
        };

    };
};
