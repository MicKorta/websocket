package de.korta.server.productionorder.restserver.threads;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import de.korta.server.productionorder.restserver.model.internal.Order;
import de.korta.server.productionorder.restserver.utilities.NumberUtilities;
import de.korta.server.productionorder.restserver.websocket.controller.ProductionController;

/**
 * This thread is responsible for monitoring production
 * 
 * @author Michael Korta; 2019-08-31
 *
 */
public class ProductionThread extends Thread {

	private List<Order> orderList;
	private SimpMessagingTemplate template;
	
	public ProductionThread(SimpMessagingTemplate template, List<Order> orderList) {
		this.template = template;
		this.orderList = orderList;
	}
	
	final static Logger logger = Logger.getLogger(ProductionThread.class);
	final private int NEXT_SEND_WAITING_TIME = 1000; // Milliseconds
	
	private boolean run = true;
	
	/**
	 * This method monitors the global order list and updates the status of each order
	 */
	@Override
	public void run() {
		ProductionController productionController = new ProductionController();

		long now = 0;
		while (this.isRunning()) {
			try {
				Thread.sleep(getUpdateWaitingTime());
				now = new Date().getTime();
				if (this.orderList != null) {
					for (Order order : this.orderList) {
						if (order != null) {
							if (now > order.getCreated() + order.getTTL()) {
								switch(order.getState()) {
									case PLANNED: {
										order.setState(de.korta.server.productionorder.restserver.model.enums.State.PROCESSING);
										order.setTTL(NumberUtilities.getRandomNumberInRange(4000, 14000));
										logger.info("Sending update...");
										productionController.sendStatusUpdate(this.template, order);
									} break;
									case PROCESSING: {
										order.setState(de.korta.server.productionorder.restserver.model.enums.State.FINISHED);
										logger.info("Sending update...");
										productionController.sendStatusUpdate(this.template, order);
									} break;
									case CREATED: {
										// NOOP
									} break;
									case FINISHED: {
										// NOOP
									} break;
									default: {
										logger.warn("Unknown order state: " + order.getState());
									}
								}
							} else if (order.getState() == de.korta.server.productionorder.restserver.model.enums.State.CREATED) {
								order.setTTL(NumberUtilities.getRandomNumberInRange(4000, 14000));
								order.setState(de.korta.server.productionorder.restserver.model.enums.State.PLANNED);
								logger.info("Sending update...");
								productionController.sendStatusUpdate(this.template, order);
							}
						} 
					}
				}				
			} catch (InterruptedException e) {
				logger.error("Thread " + Thread.currentThread().getName() + " reported an error: ", e);
			}
		}
	}
	
	/**
	 * PRIVATE - METHODS 
	 */
	private boolean isRunning() {
		return this.run;
	}

	private long getUpdateWaitingTime() {
		return this.NEXT_SEND_WAITING_TIME;
	}	
}
