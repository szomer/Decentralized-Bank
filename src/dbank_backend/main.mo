import Debug "mo:base/Debug";

// actor is like a class
actor DBank {
  var currentValue : Nat = 300; // decalre variable
  currentValue := 200; // change variable value

  // update call - by the blockchain - slow
  // public function
  // amount with datatype Natrual number
  public func topUp(amount : Nat) {
    currentValue += amount;
    Debug.print(debug_show (currentValue)); // print
  };
  public func withdrawl(amount : Nat) {
    if (amount <= currentValue) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Withdraw amount too large.");
    };
  };

  // query call - not by blockchain - fast
  // asynchronously return a Natrual number
  public query func checkBalance() : async Nat {
    return currentValue;
  };

  // calling a the function
  // topUp(2);
};
