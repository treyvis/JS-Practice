//Find all of the prime numbers between 1 and a given number n. Return the prime numbers in an array and print the numbers to the console.

function findPrimes(n) {

	var t = 2;
	var primes = [];

	while (t <= n){
		if (t === 2) {
			primes.push(2);
		} else if (t === 3) {
			primes.push(3);
		} else {

			var divisible = false;

			for (i = 0; divisible !== true && i < primes.length; i++){
				if (t % primes[i] === 0){
					divisible = true;
				}
			}

			if (divisible === false){
				primes.push(t);
			}
		}

		t++;
	}

	for (var i in primes){
		console.log(primes[i]);
	}

	return primes;
}