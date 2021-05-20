package de.korta.server.productionorder.restserver.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import de.korta.server.productionorder.restserver.model.enums.State;
import de.korta.server.productionorder.restserver.model.enums.Type;

/**
 * The data transfer object for orders
 * 
 * @author Michael Korta; 2019-08-31
 *
 */
public class OrderDto {
	
	@JsonProperty("_id")
	private long id;
	@JsonProperty("_state")
	private State state;
	@JsonProperty("_created")
	private long created;
	@JsonProperty("_type")
	private Type type;
	
	public OrderDto() {
		// NOOP
	}
	
	public OrderDto(long id, Type type) {
		this.id = id;
		this.state = State.PLANNED;
		this.created = new Date().getTime();
		this.type = type;
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
	
	// SETTER
	public void setState(State state) {
		this.state = state;
	}

	public void setCreated(long created) {
		this.created = created;
	}
}