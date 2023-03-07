import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

// actor is like a class
actor DBank {
  // stable makes the variable persistant (remembers the value even after redeploy)
  stable var currentValue : Float = 300; // decalre variable
  // currentValue := 200; // change variable value

  stable var startTime = Time.now();
  Debug.print(debug_show (startTime));

  // update call - by the blockchain - slow
  // public function
  // amount with datatype Float
  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue)); // print
  };
  public func withdrawl(amount : Float) {
    if (amount <= currentValue) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Withdraw amount too large.");
    };
  };

  // query call - not by blockchain - fast
  // asynchronously return a Float number
  public query func checkBalance() : async Float {
    return currentValue;
  };

  // calling a the function
  // topUp(2);

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime; // get time elapsed in nanoseconds
    let timeElapsedS = timeElapsedNS / 1000000000; // get time elapsed in seconds

    // formula to calc compount, convert the seconds to a float
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));

    // update the start time
    startTime := currentTime;
  };

};
