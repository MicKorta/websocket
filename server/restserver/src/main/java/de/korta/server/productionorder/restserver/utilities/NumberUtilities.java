package de.korta.server.productionorder.restserver.utilities;

import java.util.Random;

/**
 * Utility class for the handling numbers
 * 
 * @author Michael Korta; 2019-08-31
 *
 */
public class NumberUtilities {

	/**
	 * Creates a random number within a given range
	 * @param min - the lower limit of the random number to be generated
	 * @param max - the upper limit of the random number to be generated 
	 * @return the generated random
	 */
	public static int getRandomNumberInRange(int min, int max) {

		if (min >= max) {
			throw new IllegalArgumentException("max must be greater than min");
		}

		Random r = new Random();
		return r.nextInt((max - min) + 1) + min;
	}
}
