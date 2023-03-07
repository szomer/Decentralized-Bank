import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  // stable makes the variable persistant (remembers the value even after redeploy)
  stable var currentValue : Float = 100;
  currentValue := 100;
  Debug.print(debug_show (currentValue));

  stable var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show (startTime));

  let id = 2348923840928349;
  // Debug.print(debug_show(id));

  // update call - by the blockchain - slow
  // public function
  // amount with datatype Float
  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Amount too large, currentValue less than zero.");
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
    currentValue := currentValue * (1.0002 ** Float.fromInt(timeElapsedS));
    // update the start time
    startTime := currentTime;
  };

};
