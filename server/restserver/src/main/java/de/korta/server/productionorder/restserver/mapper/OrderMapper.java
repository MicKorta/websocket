package de.korta.server.productionorder.restserver.mapper;

import java.util.ArrayList;
import java.util.List;

import de.korta.server.productionorder.restserver.model.dto.OrderDto;
import de.korta.server.productionorder.restserver.model.internal.Order;

/**
 * Mapper class for objects of categorie order
 * 
 * @author Michael Korta, 2019-08-31
 *
 */
public class OrderMapper {

	/**
	 * Maps an {@link Order} to an {@link OrderDto}
	 * @param the {@link Order} to be mapped - can be <code>null</null>
	 * @return the {@link OrderDto} - can be <code>null</code>
	 */
	public static OrderDto map(Order order) {
		OrderDto orderDto = null;
		if (order != null) {
			orderDto = new OrderDto(order.getId(), order.getType());
			orderDto.setCreated(order.getCreated());
			orderDto.setState(order.getState());
		}
		
		return orderDto;
	}
	
	/**
	 * Maps a {@link List} of the internal {@link Order} model class to a {@link List} of {@link OrderDto}
	 * @param the {@link List} of {@link Order} objects to be mapped - can be <code>null</code>
	 * @return the {@link List} of {@link OrderDto} objects - can be <code>null</code>
	 */
	public static List<OrderDto> map(List<Order> orderList) {
		List<OrderDto> result = null;
		if (orderList != null) {
			result = new ArrayList<>();
			for (Order order : orderList) {
				if (order != null) {
					result.add(map(order));
				}
			}
		}
		return result;
	}
}
