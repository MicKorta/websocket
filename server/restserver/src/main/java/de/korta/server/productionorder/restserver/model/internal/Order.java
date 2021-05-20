package de.korta.server.productionorder.restserver.model.internal;

import java.util.Date;

import de.korta.server.productionorder.restserver.model.enums.State;
import de.korta.server.productionorder.restserver.model.enums.Type;
import de.korta.server.productionorder.restserver.utilities.NumberUtilities;

/**
 * This class represents the internal model of an order object
 * 
 * @author Michael Korta; 2019-08-31
 *
 */
public class Order {
	
	private long id;
	private State state;
	private long created;
	private Type type;
	private long ttl;
	
	public Order(long id, Type type) {
		this.id = id;
		this.state = State.CREATED;
		this.created = new Date().getTime();
		this.type = type;		
		this.ttl = NumberUtilities.getRandomNumberInRange(4000, 14000);
	}

	// GETTER
	public long getId() {
		return id;
	}

	public State getState() {
		return state;
	}
	
	public long getCreated() {
		return this.created;
	}
	
	public Type getType() {
		return this.type;
	}
	public long getTTL() {
		return this.ttl;
	}
	
	// SETTER
	public void setState(State value) {
		this.state = value;
	}
	
	public void setTTL(long value) {
		this.ttl = value;
	}
}