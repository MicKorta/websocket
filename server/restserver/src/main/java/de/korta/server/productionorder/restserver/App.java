package de.korta.server.productionorder.restserver;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.korta.server.productionorder.restserver.mapper.OrderMapper;
import de.korta.server.productionorder.restserver.model.dto.OrderDto;
import de.korta.server.productionorder.restserver.model.enums.Type;
import de.korta.server.productionorder.restserver.model.internal.Order;
import de.korta.server.productionorder.restserver.provider.IdProvider;
import de.korta.server.productionorder.restserver.threads.ProductionThread;

/**
 * The projects main class and rest controller
 * 
 * @author Michael Korta; 2019-08-31
 *
 */
@EnableAutoConfiguration
@RestController
@CrossOrigin
@ComponentScan("de.korta.server.productionorder.restserver.*")
public class App 
{
	@Autowired
	SimpMessagingTemplate template;
	
	final static Logger logger = Logger.getLogger(App.class);
	
	private IdProvider idProvider;
	private List<Order> orderList;
	private ProductionThread productionThread;
	
	/**
	 * the start method of the application
	 * @param args - can be <code>null</code>
	 */
    public static void main( String[] args ) {
    	SpringApplication.run(App.class, args);
    }
    
    /**
     * Prepares the application for launch
     */
    @PostConstruct
	public void setup() {
    	this.idProvider = new IdProvider(10000);
    	this.orderList = new ArrayList<>();
    	this.productionThread = new ProductionThread(this.template, this.orderList);
    	this.productionThread.start();
    }
    
    /**
     * Service to delete the responding order object
     * @param request
     * @param response
     * @param orderDto
     * @return http status and the updated order list
     */ 
    @RequestMapping(value = "/api/deleteOrder", method = RequestMethod.PUT)
    public Response deleteOrder(HttpServletRequest request, HttpServletResponse response, @RequestBody OrderDto orderDto) {
		logger.info("Incoming request: PUT deleteOrder");
		
		List<Order> toDelete = new ArrayList<>();
		for (Order order : this.orderList) {
			if (order != null && order.getId() == orderDto.getId()) {
				toDelete.add(order);
			}
		}
		this.orderList.removeAll(toDelete);		
		List<OrderDto> orderDtoList = OrderMapper.map(this.orderList);
		return Response.status(Response.Status.OK).entity(orderDtoList).build(); // 200
	}
    
    /**
     * Service to create a new switcher object
     * @param request
     * @param response
     * @return http status and the created object
     * @throws InterruptedException
     */
    @RequestMapping(value = "/api/createSwitcher", method = RequestMethod.GET)
    public Response createSwitcher(HttpServletRequest request, HttpServletResponse response) throws InterruptedException {
		logger.info("Incoming request: GET createSwitch");
		Thread.sleep(1000); // pretending it takes a while...
		Order order = new Order(this.idProvider.createId(), Type.SWITCHER);
		this.orderList.add(order);
		return Response.status(Response.Status.OK).entity(order).build(); // 200
	}
    
    /**
     * Service to create a light object
     * @param request
     * @param response
     * @return http status and the created object
     * @throws InterruptedException
     */
    @RequestMapping(value = "/api/createLight", method = RequestMethod.GET)
    public Response createLight(HttpServletRequest request, HttpServletResponse response) throws InterruptedException {
		logger.info("Incoming request: GET createLamp");
		Thread.sleep(1500); // pretending it takes a while...
		Order order = new Order(this.idProvider.createId(), Type.LIGHT);
		this.orderList.add(order);
		return Response.status(Response.Status.OK).entity(order).build(); // 200
	}
    
    /**
     * Service to create a housing object
     * @param request
     * @param response
     * @return http status and the created object
     * @throws InterruptedException
     */
    @RequestMapping(value = "/api/createHousing", method = RequestMethod.GET)
    public Response createCase(HttpServletRequest request, HttpServletResponse response) throws InterruptedException {
		logger.info("Incoming request: GET createCase");
		Thread.sleep(2000); // pretending it takes a while...
		Order order = new Order(this.idProvider.createId(), Type.HOUSING);
		this.orderList.add(order);
		return Response.status(Response.Status.OK).entity(order).build(); // 200
	}
    
    /**
     * Service get retrieve all available orders
     * @param request
     * @param response
     * @return http status and a list of all available order objects
     */
    @RequestMapping(value = "/api/getAllOrders", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON)
    public Response getAllOrders(HttpServletRequest request, HttpServletResponse response) {
		logger.info("Incoming request: GET getAllOrders");
		List<OrderDto> orderDtoList = OrderMapper.map(this.orderList);
		return Response.status(Response.Status.OK).entity(orderDtoList).build(); // 200
	}    
}
