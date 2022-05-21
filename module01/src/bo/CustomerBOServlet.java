package bo;

import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import dao.DAOFactory;
import dao.custom.CustomerDAO;
import entity.Customer;

import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;


@WebServlet(urlPatterns = "/customer")
public class CustomerBOServlet extends HttpServlet {

    CustomerDAO customerDAO= (CustomerDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.CUSTOMER);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        JsonReader reader = Json.createReader(req.getReader());

        JsonObject jsonObject = reader.readObject();

        String id=jsonObject.getString("id");
        String name=jsonObject.getString("name");
        String tp=jsonObject.getString("tp");
        String address=jsonObject.getString("address");


        JsonObjectBuilder response =Json.createObjectBuilder();;
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");
        try {
            boolean add = customerDAO.add(new Customer(id, name, tp, address));

            if (add) {

                resp.setStatus(HttpServletResponse.SC_CREATED);//201
                response.add("status", 200);
                response.add("message", "Successfully Added");
                response.add("data", "");
                writer.print(response.build());
            }

        } catch (ClassNotFoundException e) {



            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", e.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            e.printStackTrace();
        } catch (SQLException throwables) {

            response.add("status", 400);
            response.add("message", "Error");
            response.add("data", throwables.getLocalizedMessage());
            writer.print(response.build());

            resp.setStatus(HttpServletResponse.SC_OK); //200
            throwables.printStackTrace();
        }
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
              String option=req.getParameter("option");
              resp.setContentType("application/json");
              switch (option){

                  case "GETALL" :

                      try {
                          ArrayList<Customer> all = customerDAO.getAll();

                          JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();


                          for (Customer customer : all) {
                              JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                              objectBuilder.add("id", customer.getId());
                              objectBuilder.add("name" , customer.getName());
                              objectBuilder.add("tp",customer.getTp());
                              objectBuilder.add("address",customer.getAddress());

                              arrayBuilder.add(objectBuilder.build());

                          }


                          JsonObjectBuilder response = Json.createObjectBuilder();
                          response.add("status" , 200);
                          response.add("message" , "Done");
                          response.add("data" , arrayBuilder.build());

                          PrintWriter writer = resp.getWriter();
                          writer.print(response.build());




                      } catch (SQLException e) {

                          throw new RuntimeException(e);

                      } catch (ClassNotFoundException e) {
                          throw new RuntimeException(e);
                      }
                      break;

              }
    }
}



