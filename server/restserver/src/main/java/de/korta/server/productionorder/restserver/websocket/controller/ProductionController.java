package de.korta.server.productionorder.restserver.websocket.controller;

import org.apache.log4j.Logger;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import de.korta.server.productionorder.restserver.mapper.OrderMapper;
import de.korta.server.productionorder.restserver.model.dto.OrderDto;
import de.korta.server.productionorder.restserver.model.internal.Order;

/**
 * Controller for the production
 * 
 * @author Michael Korta, 2019-09-01
 *
 */
@Controller("productionController")
public class ProductionController {

	final static Logger logger = Logger.getLogger(ProductionController.class);
	
	/**
	 * Sends status updates concerning the production
	 * @param template the messaging template
	 * @param order the order to which the message refers
	 */
	public void sendStatusUpdate(SimpMessagingTemplate template, Order order) {
        OrderDto orderDto = OrderMapper.map(order);
        template.convertAndSend("/topic/public", orderDto);
    }
}