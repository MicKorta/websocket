package de.korta.server.productionorder.restserver.provider;

/**
 * This class is a utility class for providing ids in case of a missing database
 * 
 * @author Michael Korta; 2019-08-31
 *
 */
public class IdProvider {
	
	private long id;
	
	public IdProvider(long startValue) {
		this.id = startValue;
	}
	
	/**
	 * retrieves the next valid id
	 * @return the id
	 */
	public long createId() {
		return ++this.id;
	}
}
